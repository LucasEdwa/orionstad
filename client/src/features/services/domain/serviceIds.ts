// Kept free of imports so the router can use it without pulling in the feature
export const SERVICE_IDS = [
  'hemstadning',
  'flyttstadning',
  'storstadning',
  'fonsterputs',
  'kontorsstadning',
  'extra-hjalp',
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const isServiceId = (value: string | undefined): value is ServiceId =>
  !!value && (SERVICE_IDS as readonly string[]).includes(value);
