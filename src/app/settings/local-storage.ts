import {
  AppSettings,
  BaseAppSettingsInterface,
  DEFAULT_SETTINGS,
} from './base';

export class LocalStorageSettingsInterface extends BaseAppSettingsInterface {
  loadSettings(): void {
    const settingsJson = localStorage.getItem('settings');
    if (!settingsJson) {
      this.currentSettings = DEFAULT_SETTINGS;
      this.saveSettings(DEFAULT_SETTINGS);
      return;
    }
    this.currentSettings = JSON.parse(settingsJson);
  }

  saveSettings(settings: AppSettings): void {
    localStorage.setItem('settings', JSON.stringify(settings));
    this.currentSettings = settings;
  }
}
