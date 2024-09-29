import { ClockScreen } from '.';
import { Logger } from '../../log';
import { formatTime } from '../../utils';
import { InputArgs, InputHandler, RenderArgs, Screen } from '../base';
import { MainDisplayCollection } from '../collection';

const LOGGER = new Logger('Countdown');
const MODES = {
  Countdown: 0,
  SetTime: 1,
  Exit: 0xff,
};
const SET_TIME_CURSOR = {
  Hour: 0,
  Minute: 1,
  Second: 2,
};

export class CountdownScreen
  implements Screen<MainDisplayCollection>, InputHandler<MainDisplayCollection>
{
  readonly supportsInput = true;

  private mode = MODES.Countdown;
  private countdownTime = 0;

  private lastInput = 0;

  private setHour = 0;
  private setMinute = 0;
  private setSecond = 0;
  private cursorPos = SET_TIME_CURSOR.Hour;

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    switch (this.mode) {
      case MODES.Countdown:
        this.renderCountdown(renderArgs);
        break;
      case MODES.SetTime:
        this.renderSetTime(renderArgs);
        break;
      case MODES.Exit:
        renderArgs.changeScreen(new ClockScreen());
        break;
      default:
        throw new Error(`Unknown mode: ${this.mode}`);
    }
  }

  private renderCountdown(renderArgs: RenderArgs<MainDisplayCollection>): void {
    const { displays } = renderArgs;
    const showFlash = (renderArgs.time / 1000) % 1 > 0.5;

    if (this.countdownTime > 0) {
      const timeDiff = this.countdownTime - renderArgs.time;
      if (timeDiff >= 0) {
        displays.main.show(
          formatTime(timeDiff / 1000, timeDiff % 1000 > 500 ? ' ' : ':'),
        );
        displays.weekday.showCenter('');
      } else if (timeDiff >= -60_000) {
        displays.main.show(showFlash ? '' : '0:00');
        displays.weekday.showCenter(showFlash ? '' : 'Time Over!');
      } else {
        this.countdownTime = 0;
      }
    } else {
      displays.main.show('--:--:--');
      displays.weekday.showCenter('[S] Set Time');
    }

    displays.date.show('');
  }

  private renderSetTime(renderArgs: RenderArgs<MainDisplayCollection>): void {
    const { displays } = renderArgs;
    const showFlash =
      (renderArgs.time / 1000) % 1 > 0.65 &&
      this.lastInput < renderArgs.time - 1000;

    const displayTime = [
      showFlash && this.cursorPos === SET_TIME_CURSOR.Hour
        ? '  '
        : this.setHour.toString().padStart(2, '0'),
      showFlash && this.cursorPos === SET_TIME_CURSOR.Minute
        ? '  '
        : this.setMinute.toString().padStart(2, '0'),
      showFlash && this.cursorPos === SET_TIME_CURSOR.Second
        ? '  '
        : this.setSecond.toString().padStart(2, '0'),
    ].join(':');

    displays.main.showLeft(displayTime);
    displays.date.show('');
    displays.weekday.showCenter('Enter Time');
  }

  onInputReceived(e: InputArgs<MainDisplayCollection>): boolean | undefined {
    LOGGER.debug('onInputReceived', e.input.key);
    switch (this.mode) {
      case MODES.Countdown:
        return this.handleInputCountdown(e.input);
      case MODES.SetTime:
        return this.handleInputSetTime(e.input);
      default:
        throw new Error(`Unknown mode: ${this.mode}`);
    }
  }

  private handleInputCountdown(e: KeyboardEvent): boolean | undefined {
    switch (e.key) {
      case 's':
        this.mode = MODES.SetTime;
        return true;
      case 'Escape':
        this.mode = MODES.Exit;
        return true;
      default:
        return undefined;
    }
  }

  private handleInputSetTime(e: KeyboardEvent): boolean | undefined {
    this.lastInput = Date.now();
    switch (e.key) {
      case 'ArrowUp':
        switch (this.cursorPos) {
          case SET_TIME_CURSOR.Hour:
            this.setHour = (this.setHour + 1) % 24;
            break;
          case SET_TIME_CURSOR.Minute:
            this.setMinute = (this.setMinute + 1) % 60;
            break;
          case SET_TIME_CURSOR.Second:
            this.setSecond = (this.setSecond + 1) % 60;
            break;
        }
        return true;
      case 'ArrowDown':
        switch (this.cursorPos) {
          case SET_TIME_CURSOR.Hour:
            this.setHour = (this.setHour + 23) % 24;
            break;
          case SET_TIME_CURSOR.Minute:
            this.setMinute = (this.setMinute + 59) % 60;
            break;
          case SET_TIME_CURSOR.Second:
            this.setSecond = (this.setSecond + 59) % 60;
            break;
        }
        return true;
      case 'ArrowLeft':
        this.cursorPos = (this.cursorPos - 1) % 3;
        return true;
      case 'ArrowRight':
        this.cursorPos = (this.cursorPos + 1) % 3;
        return true;
      case 'Enter':
        this.setTime();
        this.mode = MODES.Countdown;
        return true;
      case 'Escape':
        this.mode = MODES.Countdown;
        return true;
      default:
        return undefined;
    }
  }

  private setTime(): void {
    const timeDiff =
      this.setHour * 3600 + this.setMinute * 60 + this.setSecond + 1;
    this.countdownTime = Date.now() + timeDiff * 1000;
  }
}
