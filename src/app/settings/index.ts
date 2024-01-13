import { isWpeEnabled } from '../plugins';
import { AppSettingsInterface } from './base';

export { DEFAULT_SETTINGS } from './base';
export type { AppSettings, AppSettingsInterface } from './base';

export async function createSettingsInterface(): Promise<AppSettingsInterface> {
  if (isWpeEnabled()) {
    const { WpeSettingsInterface } = await import('./wpe');
    const wpeSettings = new WpeSettingsInterface();
    window.wallpaperPropertyListener = wpeSettings;
    return wpeSettings;
  }

  const { LocalStorageSettingsInterface } = await import('./local-storage');
  return new LocalStorageSettingsInterface();
}
