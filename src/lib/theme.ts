import type { FontSizePreference, ThemePreference } from '@/types/progress';

const media = () => window.matchMedia('(prefers-color-scheme: dark)');

/**
 * The course is paper-first: light is the canonical look, with a white page and
 * black ink. Dark mode is an explicit choice, never an automatic surprise.
 */
export function resolveTheme(preference: ThemePreference): 'light' | 'dark' {
  if (preference === 'system') return 'light';
  return preference;
}

export function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === 'dark');
  root.style.colorScheme = resolved;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = resolved === 'dark' ? '#0f0f0f' : '#ffffff';
}

export function applyFontSize(size: FontSizePreference) {
  document.documentElement.dataset.fontSize = size;
}

export function watchSystemTheme(preference: ThemePreference) {
  const listener = () => {
    if (preference === 'system') applyTheme('system');
  };
  media().addEventListener('change', listener);
  return () => media().removeEventListener('change', listener);
}
