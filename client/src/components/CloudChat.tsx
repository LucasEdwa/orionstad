import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa';

const WIDGET_SCRIPT_ID = 'cloud-chat-widget-script';
const SESSION_STORAGE_KEY = 'orionstad-chat-session-id';

function resolveWidgetEnabled(prop: boolean | undefined): boolean {
  if (prop !== undefined) {
    return prop;
  }
  const v = import.meta.env.VITE_CHAT_VISIBLE?.toLowerCase()?.trim();
  if (v === 'false' || v === '0' || v === 'no' || v === 'off') {
    return false;
  }
  return true;
}

function normalizeApiBase(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

function getOrCreateSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `anon-${Date.now()}`;
  }
}

function clearSessionId(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

type ChatLine = { role: 'user' | 'assistant'; text: string };

async function postChat(
  apiBase: string,
  sessionId: string,
  message: string,
): Promise<{ reply: string; done: boolean }> {
  const res = await fetch(`${apiBase}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Ngrok free tier: reduces browser warning interstitial issues on API calls
      'ngrok-skip-browser-warning': '69420',
    },
    body: JSON.stringify({ session_id: sessionId, message }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `Chat request failed (${res.status})`);
  }
  return res.json() as Promise<{ reply: string; done: boolean }>;
}

export interface CloudChatProps {
  /**
   * Base URL for the chat API (`POST {base}/chat`). Highest priority when set.
   * Env: `VITE_CHAT_API_URL` (no trailing slash; no `/chat`).
   */
  apiBaseUrl?: string;
  /**
   * Third-party widget script (e.g. `…/widget.js`). Injects `<script>`. Ignored when `apiBaseUrl` is set.
   * Env: `VITE_CHAT_WIDGET_SCRIPT_URL`.
   */
  widgetScriptUrl?: string;
  /** Iframe URL. Env: `VITE_CHAT_URL`. Used if no API base and no widget script. */
  chatUrl?: string;
  title?: string;
  subtitle?: string;
  launcherLabel?: string;
  visible?: boolean;
}

function ChatPanelChrome({
  open,
  setOpen,
  title,
  subtitle,
  launcherLabel,
  children,
}: {
  open: boolean;
  setOpen: (v: boolean | ((b: boolean) => boolean)) => void;
  title: string;
  subtitle: string;
  launcherLabel: string;
  children: React.ReactNode;
}) {
  const panelId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 right-5 z-[10050] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:opacity-95 focus:ring-2 focus:ring-[#98754C] focus:ring-offset-2 focus:outline-none sm:bottom-6 sm:right-6"
        style={{
          background: 'linear-gradient(135deg, #3C0C0C 0%, #98754C 100%)',
        }}
        aria-label={launcherLabel}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <FaTimes className="h-6 w-6" aria-hidden /> : <FaComments className="h-6 w-6" aria-hidden />}
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[10040] bg-black/40 backdrop-blur-[1px]"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed z-[10060] flex h-[min(560px,calc(100dvh-7rem))] max-h-[min(640px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-2xl border border-[#3C0C0C]/20 bg-white shadow-2xl bottom-[max(5.75rem,env(safe-area-inset-bottom))] left-3 right-3 sm:bottom-24 sm:left-auto sm:right-6 sm:w-[min(420px,calc(100vw-2rem))]"
          >
            <header
              className="flex shrink-0 items-start justify-between gap-3 px-4 py-3 text-white"
              style={{
                background: 'linear-gradient(90deg, #3C0C0C 0%, #98754C 100%)',
              }}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-tight">{title}</p>
                <p className="truncate text-xs text-white/85">{subtitle}</p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-lg p-2 text-white/90 transition hover:bg-white/15 focus:ring-2 focus:ring-white/50 focus:outline-none"
                aria-label="Close chat window"
                onClick={() => setOpen(false)}
              >
                <FaTimes className="h-4 w-4" aria-hidden />
              </button>
            </header>
            {children}
          </div>
        </>
      ) : null}
    </>
  );
}

function CloudChatApiPanel({
  apiBase,
  title,
  subtitle,
  launcherLabel,
}: {
  apiBase: string;
  title: string;
  subtitle: string;
  launcherLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatLine[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingDone, setBookingDone] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || pending) {
      return;
    }
    setInput('');
    setError(null);
    setMessages((m) => [...m, { role: 'user', text }]);
    setPending(true);
    try {
      const sessionId = getOrCreateSessionId();
      const data = await postChat(apiBase, sessionId, text);
      setMessages((m) => [...m, { role: 'assistant', text: data.reply }]);
      setBookingDone(Boolean(data.done));
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Något gick fel.';
      setError(msg);
    } finally {
      setPending(false);
    }
  }, [apiBase, input, pending]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, pending]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      void send();
    },
    [send],
  );

  const newConversation = useCallback(() => {
    clearSessionId();
    setMessages([]);
    setBookingDone(false);
    setError(null);
    setInput('');
  }, []);

  return (
    <ChatPanelChrome open={open} setOpen={setOpen} title={title} subtitle={subtitle} launcherLabel={launcherLabel}>
      <div className="flex min-h-0 flex-1 flex-col bg-neutral-50">
        <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
          {messages.length === 0 && !pending && (
            <p className="text-sm text-neutral-600">
              Hej! Ställ en fråga om städning, priser, RUT eller bokning — vi svarar på svenska.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={`${i}-${m.role}-${m.text.slice(0, 20)}`}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[#3C0C0C] text-white'
                    : 'border border-neutral-200 bg-white text-neutral-900 shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {pending && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-500 shadow-sm">
                Skriver…
              </div>
            </div>
          )}
          {error && (
            <p className="rounded-lg bg-red-50 px-2 py-1.5 text-sm text-red-800" role="alert">
              {error}
            </p>
          )}
          {bookingDone && (
            <p className="rounded-lg bg-emerald-50 px-2 py-1.5 text-sm text-emerald-900">
              Tack — enligt chatten är din bokning klar. Vi hör av oss vid behov.
            </p>
          )}
        </div>

        <form onSubmit={onSubmit} className="shrink-0 border-t border-neutral-200 bg-white p-3">
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              className="text-xs text-[#98754C] underline underline-offset-2 hover:text-[#3C0C0C]"
              onClick={newConversation}
            >
              Ny chatt
            </button>
          </div>
          <div className="flex gap-2">
            <textarea
              className="min-h-[44px] flex-1 resize-none rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[#98754C] focus:ring-1 focus:ring-[#98754C]"
              rows={2}
              placeholder="Skriv ditt meddelande…"
              value={input}
              disabled={pending}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-xl text-white disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #3C0C0C 0%, #98754C 100%)' }}
              aria-label="Skicka"
            >
              <FaPaperPlane className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </form>
      </div>
    </ChatPanelChrome>
  );
}

function CloudChatIframeEmbed({
  chatUrl,
  title,
  subtitle,
  launcherLabel,
}: {
  chatUrl: string;
  title: string;
  subtitle: string;
  launcherLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ChatPanelChrome open={open} setOpen={setOpen} title={title} subtitle={subtitle} launcherLabel={launcherLabel}>
      <iframe
        title={title}
        src={chatUrl}
        className="min-h-0 w-full flex-1 border-0 bg-neutral-50"
        allow="microphone; camera; clipboard-write; fullscreen"
      />
    </ChatPanelChrome>
  );
}

export const CloudChat: React.FC<CloudChatProps> = ({
  apiBaseUrl = import.meta.env.VITE_CHAT_API_URL,
  widgetScriptUrl = import.meta.env.VITE_CHAT_WIDGET_SCRIPT_URL,
  chatUrl = import.meta.env.VITE_CHAT_URL,
  title = import.meta.env.VITE_CHAT_TITLE ?? 'The Cleaner Assistant',
  subtitle = import.meta.env.VITE_CHAT_SUBTITLE ?? 'Ectus Tech',
  launcherLabel = 'Open chat',
  visible: visibleProp,
}) => {
  const enabled = resolveWidgetEnabled(visibleProp);
  const apiBase = normalizeApiBase(apiBaseUrl ?? '');
  const apiMode = Boolean(apiBase);
  const iframeUrl = (chatUrl ?? '').trim();
  const scriptSrc = (widgetScriptUrl ?? '').trim();
  const scriptMode = Boolean(scriptSrc) && !apiMode;
  const iframeMode = Boolean(iframeUrl) && !apiMode && !scriptMode;

  useEffect(() => {
    if (!enabled) {
      document.getElementById(WIDGET_SCRIPT_ID)?.remove();
      return;
    }

    if (!scriptMode) {
      document.getElementById(WIDGET_SCRIPT_ID)?.remove();
      return;
    }

    if (document.getElementById(WIDGET_SCRIPT_ID)) {
      return;
    }

    const s = document.createElement('script');
    s.id = WIDGET_SCRIPT_ID;
    s.src = scriptSrc;
    s.async = true;
    document.body.appendChild(s);

    return () => {
      document.getElementById(WIDGET_SCRIPT_ID)?.remove();
    };
  }, [enabled, scriptMode, scriptSrc]);

  useEffect(() => {
    if (enabled && !apiBase && !iframeUrl && !scriptSrc) {
      console.warn(
        'CloudChat: set VITE_CHAT_API_URL (fetch /chat), or VITE_CHAT_WIDGET_SCRIPT_URL, or VITE_CHAT_URL.',
      );
    }
  }, [enabled, apiBase, iframeUrl, scriptSrc]);

  if (!enabled) {
    return null;
  }

  if (apiMode) {
    return (
      <CloudChatApiPanel apiBase={apiBase} title={title} subtitle={subtitle} launcherLabel={launcherLabel} />
    );
  }

  if (scriptMode) {
    return null;
  }

  if (!iframeMode) {
    return null;
  }

  return (
    <CloudChatIframeEmbed
      chatUrl={iframeUrl}
      title={title}
      subtitle={subtitle}
      launcherLabel={launcherLabel}
    />
  );
};
