import { Logger } from '../../log';
import { InputArgs, InputHandler, RenderArgs, Screen } from '../base';
import { MainDisplayCollection } from '../collection';
import { AppSettings, AppSettingsInterface } from '../settings';
import { DisplayStyle } from '../settings/base';
import { ClockScreen } from './clock';

const LOGGER = new Logger('SettingsScreen');

const LABELS: Record<keyof AppSettings, string> = {
  timeStyle: 'Time Style',
  fadeInTime: 'Fade In Time',
  fadeOutTime: 'Fade Out Time',
};

const KEYS: (keyof AppSettings)[] = Object.keys(LABELS).map(
  (k) => k as keyof AppSettings,
);

const OPTIONS: DisplayStyle[] = ['7seg', '16seg', 'matrix'];
const OPTIONS_INDEX: Record<DisplayStyle, number> = OPTIONS.reduce(
  (p, c, i) => {
    return {
      ...p,
      [c]: i,
    };
  },
  {} as Record<DisplayStyle, number>,
);

const SETTINGS_RENDER: Record<
  keyof AppSettings,
  (currentSettings: AppSettings) => string
> = {
  timeStyle: (c) => {
    switch (c.timeStyle) {
      case '7seg':
        return '7 Segment';
      case '16seg':
        return '16 Segment';
      case 'matrix':
        return 'Matrix';
      default:
        return c.timeStyle;
    }
  },
  fadeInTime: (c) => `${c.fadeInTime} ms`,
  fadeOutTime: (c) => `${c.fadeOutTime} ms`,
};

const SETTING_UPDATE: Record<
  keyof AppSettings,
  (currentSettings: AppSettings, decrease: boolean) => void
> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  timeStyle: (s, d) => {
    const delta = d ? -1 : 1;
    const currentIndex = OPTIONS_INDEX[s.timeStyle];
    const newIndex =
      d && currentIndex === 0
        ? OPTIONS.length - 1
        : (currentIndex + delta) % OPTIONS.length;
    s.timeStyle = OPTIONS[newIndex];
  },
  fadeInTime: (s, d) => {
    const delta = d ? -50 : 50;
    s.fadeInTime = Math.max(Math.min(s.fadeInTime + delta, 2500), 0);
  },
  fadeOutTime: (s, d) => {
    const delta = d ? -50 : 50;
    s.fadeOutTime = Math.max(Math.min(s.fadeOutTime + delta, 2500), 0);
  },
};

export class SettingsScreen
  implements Screen<MainDisplayCollection>, InputHandler<MainDisplayCollection>
{
  readonly supportsInput = true;
  selectedOption = 0;

  private moveToScreen: Screen<MainDisplayCollection> | null = null;

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    const { displays } = renderArgs;

    if (this.moveToScreen) {
      renderArgs.changeScreen(this.moveToScreen);
      return;
    }

    const selectedOptionKey = KEYS[this.selectedOption];
    const selectedOptionLabel = LABELS[selectedOptionKey];

    displays.main.showCenter(
      this.renderTitle(
        renderArgs.owner.getSettingsInterface().currentSettings.timeStyle,
      ),
    );
    displays.date.showCenter(`${selectedOptionLabel}`);
    displays.weekday.show(
      this.renderValue(
        selectedOptionKey,
        renderArgs.owner.getSettingsInterface(),
      ),
    );
  }

  private renderTitle(style: DisplayStyle): string {
    switch (style) {
      case '7seg':
        return ' C  F  6';
      case 'matrix':
        return 'CONFIG';
      case '16seg':
      default:
        return 'CO NF IG';
    }
  }

  private renderValue(
    key: keyof AppSettings,
    settingsInterface: AppSettingsInterface,
  ): string {
    return SETTINGS_RENDER[key](settingsInterface.currentSettings);
  }

  onInputReceived(e: InputArgs<MainDisplayCollection>): boolean | undefined {
    const settingsInterface = e.owner.getSettingsInterface();
    switch (e.input.key) {
      case 'Escape':
        this.moveToScreen = new ClockScreen();
        return true;
      case 'ArrowUp':
        if (this.selectedOption == 0) {
          this.selectedOption = KEYS.length;
        }
        this.selectedOption -= 1;
        return true;
      case 'ArrowDown':
        this.selectedOption = (this.selectedOption + 1) % KEYS.length;
        return true;
      case 'ArrowLeft':
      case 'ArrowRight':
        this.changeValue(e.input.key === 'ArrowLeft', settingsInterface);
        return true;
      default:
        LOGGER.debug('Input Received', e.input.key);
        return undefined;
    }
  }

  private changeValue(
    decrease: boolean,
    settingsInterface: AppSettingsInterface,
  ): void {
    const selectedOptionKey = KEYS[this.selectedOption];
    SETTING_UPDATE[selectedOptionKey](
      settingsInterface.currentSettings,
      decrease,
    );
    settingsInterface.saveSettings(settingsInterface.currentSettings);
  }
}
