import { Logger } from '../../log';
import { jsonClone } from '../utils';
import {
  AppSettings,
  BaseAppSettingsInterface,
  DEFAULT_SETTINGS,
} from './base';

const LOGGER = new Logger('MemorySettingsInterface');

export class MemorySettingsInterface extends BaseAppSettingsInterface {
  constructor() {
    super();
    this.currentSettings = jsonClone(DEFAULT_SETTINGS);
    LOGGER.info('Created instance');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loadSettings(): void {
    /* do nothing */
  }

  saveSettings(settings: AppSettings): void {
    LOGGER.info('Updating settings', settings);
    this.currentSettings = jsonClone(settings);
  }
}
