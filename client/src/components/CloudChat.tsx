import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaMagic,
  FaPaperPlane,
  FaRedoAlt,
  FaRobot,
  FaTimes,
  FaUserCircle,
} from 'react-icons/fa';

const WIDGET_SCRIPT_ID = 'cloud-chat-widget-script';
const SESSION_STORAGE_KEY = 'orionstad-chat-session-id';
const LAUNCHER_TEASER_DISMISSED_KEY = 'orionstad-chat-launcher-teaser-dismissed';

/** Shown when no prop/env copy is set; also use in `<CloudChat launcherTeaser={...} />` for reliable production text. */
export const DEFAULT_LAUNCHER_TEASER =
  'Hej! 👋 Behöver du hjälp? Chatta med oss om städning, priser eller bokning.';

/** Env can be empty in Amplify (`VITE_CHAT_LAUNCHER_TEASER=`); `??` does not fall back for "", so we normalize here. */
function resolveLauncherTeaser(prop: string | undefined, envRaw: string | undefined): string {
  if (prop !== undefined) {
    return prop;
  }
  const fromEnv = typeof envRaw === 'string' ? envRaw.trim() : '';
  if (fromEnv !== '') {
    return fromEnv;
  }
  return DEFAULT_LAUNCHER_TEASER;
}

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

function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3 py-2 shadow-sm"
      aria-hidden
    >
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#98754C] [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#98754C] [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#98754C]" />
    </div>
  );
}

function AssistantMessageAvatar() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center self-end rounded-full bg-gradient-to-br from-[#3C0C0C] to-[#98754C] text-white shadow-sm"
      aria-hidden
    >
      <FaRobot className="h-4 w-4" />
    </div>
  );
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
  apiKey: string,
): Promise<{ reply: string; done: boolean }> {
  const res = await fetch(`${apiBase}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
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
  /** API key passed as X-API-Key for direct chat requests. */
  apiKey?: string;
  title?: string;
  subtitle?: string;
  launcherLabel?: string;
  /** CTA bubble above the launcher. Omit for env/default copy; pass `""` to hide. */
  launcherTeaser?: string;
  visible?: boolean;
}

function ChatPanelChrome({
  open,
  setOpen,
  title,
  subtitle,
  launcherLabel,
  launcherTeaser,
  children,
}: {
  open: boolean;
  setOpen: (v: boolean | ((b: boolean) => boolean)) => void;
  title: string;
  subtitle: string;
  launcherLabel: string;
  launcherTeaser: string;
  children: React.ReactNode;
}) {
  const panelId = useId();
  const [teaserDismissed, setTeaserDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(LAUNCHER_TEASER_DISMISSED_KEY) === '1';
    } catch {
      return false;
    }
  });

  const dismissTeaser = useCallback(() => {
    try {
      sessionStorage.setItem(LAUNCHER_TEASER_DISMISSED_KEY, '1');
    } catch {
      /* ignore */
    }
    setTeaserDismissed(true);
  }, []);

  const teaserText = launcherTeaser.trim();
  const showTeaser = Boolean(teaserText) && !open && !teaserDismissed;

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
      <div className="fixed bottom-5 right-5 z-[10050] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
        {showTeaser ? (
          <div
            className="animate-fade-in-up relative max-w-[min(300px,calc(100vw-5.5rem))] rounded-2xl border border-[#3C0C0C]/18 bg-white px-3.5 py-3 pr-10 shadow-lg"
            role="region"
            aria-label="Inbjudan att chatta"
          >
            <div className="flex gap-3 pr-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#3C0C0C] to-[#98754C] text-white shadow-md"
                aria-hidden
              >
                <FaRobot className="h-6 w-6" />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#3C0C0C]/90">
                  <FaMagic className="h-3 w-3 shrink-0 text-[#98754C]" aria-hidden />
                  Städassistenten
                </p>
                <p className="mt-1 text-sm leading-snug font-medium text-neutral-800">{teaserText}</p>
              </div>
            </div>
            <button
              type="button"
              className="absolute top-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 focus:ring-2 focus:ring-[#98754C]/50 focus:outline-none"
              aria-label="Stäng meddelande"
              onClick={dismissTeaser}
            >
              <FaTimes className="h-3.5 w-3.5" aria-hidden />
            </button>
            <div
              className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-[#3C0C0C]/18 bg-white"
              aria-hidden
            />
          </div>
        ) : null}
        <button
          type="button"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white/35 transition hover:opacity-95 hover:shadow-xl focus:ring-2 focus:ring-[#98754C] focus:ring-offset-2 focus:outline-none"
          style={{
            background: 'linear-gradient(135deg, #3C0C0C 0%, #98754C 100%)',
          }}
          aria-label={launcherLabel}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <FaTimes className="h-6 w-6" aria-hidden />
          ) : (
            <FaRobot className="h-7 w-7" aria-hidden />
          )}
        </button>
      </div>

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
              <div className="flex min-w-0 gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm"
                  aria-hidden
                >
                  <FaRobot className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tracking-tight">{title}</p>
                  {subtitle.trim() ? (
                    <p className="truncate text-xs text-white/85">{subtitle}</p>
                  ) : null}
                </div>
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
  apiKey,
  title,
  subtitle,
  launcherLabel,
  launcherTeaser,
}: {
  apiBase: string;
  apiKey: string;
  title: string;
  subtitle: string;
  launcherLabel: string;
  launcherTeaser: string;
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
      const data = await postChat(apiBase, sessionId, text, apiKey);
      setMessages((m) => [...m, { role: 'assistant', text: data.reply }]);
      setBookingDone(Boolean(data.done));
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Något gick fel.';
      setError(msg);
    } finally {
      setPending(false);
    }
  }, [apiBase, apiKey, input, pending]);

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
    <ChatPanelChrome
      open={open}
      setOpen={setOpen}
      title={title}
      subtitle={subtitle}
      launcherLabel={launcherLabel}
      launcherTeaser={launcherTeaser}
    >
      <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-neutral-50 to-white">
        <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
          {messages.length === 0 && !pending && (
            <div className="rounded-2xl border border-[#3C0C0C]/10 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3C0C0C] to-[#98754C] text-white shadow-md"
                  aria-hidden
                >
                  <FaRobot className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-900">Välkommen!</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    Ställ en fråga om städning, priser, RUT eller bokning — vi svarar på svenska, portugisiska eller
                    spanska.
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-[#98754C]">
                    <FaMagic className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    Tips: nämn yta eller adress om du vill ha en grov uppskattning.
                  </p>
                </div>
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={`${i}-${m.role}-${m.text.slice(0, 20)}`}
              className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' ? <AssistantMessageAvatar /> : null}
              <div
                className={`max-w-[min(85%,280px)] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'rounded-br-md bg-[#3C0C0C] text-white'
                    : 'rounded-bl-md border border-neutral-200 bg-white text-neutral-900 shadow-sm'
                }`}
              >
                {m.text}
              </div>
              {m.role === 'user' ? (
                <div className="shrink-0 self-end text-[#98754C]" aria-hidden>
                  <FaUserCircle className="h-8 w-8 opacity-95" />
                </div>
              ) : null}
            </div>
          ))}
          {pending && (
            <div className="flex justify-start gap-2">
              <span className="sr-only">Assistenten skriver</span>
              <AssistantMessageAvatar />
              <TypingIndicator />
            </div>
          )}
          {error && (
            <div
              className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-900"
              role="alert"
            >
              <FaExclamationCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden />
              <span>{error}</span>
            </div>
          )}
          {bookingDone && (
            <div className="flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
              <span>Tack — enligt chatten är din bokning klar. Vi hör av oss vid behov.</span>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="shrink-0 border-t border-neutral-200 bg-white p-3">
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#98754C] underline-offset-4 hover:text-[#3C0C0C] hover:underline"
              onClick={newConversation}
            >
              <FaRedoAlt className="h-3 w-3 shrink-0" aria-hidden />
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
  launcherTeaser,
}: {
  chatUrl: string;
  title: string;
  subtitle: string;
  launcherLabel: string;
  launcherTeaser: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ChatPanelChrome
      open={open}
      setOpen={setOpen}
      title={title}
      subtitle={subtitle}
      launcherLabel={launcherLabel}
      launcherTeaser={launcherTeaser}
    >
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
  apiKey = import.meta.env.VITE_CHATBOT_API_KEY,
  title = import.meta.env.VITE_CHAT_TITLE ?? 'Orion Städ Assistent Chat',
  subtitle = import.meta.env.VITE_CHAT_SUBTITLE ?? '',
  launcherLabel = 'Öppna chatt',
  launcherTeaser: launcherTeaserProp,
  visible: visibleProp,
}) => {
  const launcherTeaser = resolveLauncherTeaser(
    launcherTeaserProp,
    import.meta.env.VITE_CHAT_LAUNCHER_TEASER,
  );
  const enabled = resolveWidgetEnabled(visibleProp);
  const apiBase = normalizeApiBase(apiBaseUrl ?? '');
  const apiKeyValue = (apiKey ?? '').trim();
  const apiMode = Boolean(apiBase);
  const iframeUrl = (chatUrl ?? '').trim();
  const scriptSrc = (widgetScriptUrl ?? '').trim();
  const scriptMode = Boolean(scriptSrc) && !apiMode;
  const iframeMode = Boolean(iframeUrl) && !apiMode && !scriptMode;
  const widgetApiUrl = normalizeApiBase((import.meta.env.VITE_CHATBOT_API_URL ?? '').trim() || apiBase);
  const widgetApiKey = (import.meta.env.VITE_CHATBOT_API_KEY ?? '').trim();
  const widgetName = (import.meta.env.VITE_CHATBOT_NAME ?? title).trim();
  const widgetGreeting = (import.meta.env.VITE_CHATBOT_GREETING ?? launcherTeaser).trim();

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

    const win = window as Window & typeof globalThis;
    if (widgetApiUrl) {
      win.CHATBOT_API_URL = widgetApiUrl;
    }
    if (widgetApiKey) {
      win.CHATBOT_API_KEY = widgetApiKey;
    }
    if (widgetName) {
      win.CHATBOT_NAME = widgetName;
    }
    if (widgetGreeting) {
      win.CHATBOT_GREETING = widgetGreeting;
    }

    const s = document.createElement('script');
    s.id = WIDGET_SCRIPT_ID;
    s.src = scriptSrc;
    s.async = true;
    document.body.appendChild(s);

    return () => {
      document.getElementById(WIDGET_SCRIPT_ID)?.remove();
      delete win.CHATBOT_API_URL;
      delete win.CHATBOT_API_KEY;
      delete win.CHATBOT_NAME;
      delete win.CHATBOT_GREETING;
    };
  }, [enabled, scriptMode, scriptSrc, widgetApiKey, widgetApiUrl, widgetGreeting, widgetName]);

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
      <CloudChatApiPanel
        apiBase={apiBase}
        apiKey={apiKeyValue}
        title={title}
        subtitle={subtitle}
        launcherLabel={launcherLabel}
        launcherTeaser={launcherTeaser}
      />
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
      launcherTeaser={launcherTeaser}
    />
  );
};
