import dateFormat from 'dateformat';
import { Logger } from '../../log';
import { center } from '../../utils';
import { InputHandler, RenderArgs, Screen } from '../base';
import { MainDisplayCollection } from '../collection';

import * as versionInfo from '../../assets/version.json';

const LOGGER = new Logger('ClockScreen');

export class ClockScreen
  implements Screen<MainDisplayCollection>, InputHandler
{
  private bootAnimationCompleted = false;
  private showTime = true;
  private showDate = false;
  private showWeekday = false;

  private showVersion = false;

  private readonly bootTime = new Date().getTime();

  readonly supportsInput = true;

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    const { displays, now } = renderArgs;

    if (this.showVersion) {
      const version = versionInfo.version;
      displays.main.show(`HE LL O!`);
      displays.date.show(
        `V ${version.major.toString().padStart(2, '0')}.${version.minor
          .toString()
          .padStart(2, '0')}.${version.patch.toString().padStart(2, '0')} | R ${
          version.revision
        }`,
      );
      displays.weekday.show(
        center(
          `<C> ${now.getFullYear()}, rGunti`,
          displays.weekday.displayCount,
          displays.weekday.specialChars,
        ),
      );
      return;
    }

    if (this.showTime) {
      displays.main.show(
        dateFormat(now, now.getMilliseconds() < 500 ? 'HH:MM:ss' : 'HH MM ss'),
      );
    } else {
      displays.main.show('');
    }

    if (this.showDate) {
      displays.date.show(
        center(
          dateFormat(now, 'dd mmmm yyyy'),
          displays.date.displayCount,
          displays.date.specialChars,
        ),
      );
    } else {
      displays.date.show('');
    }

    if (this.showWeekday) {
      displays.weekday.show(
        center(
          `${dateFormat(now, 'dddd')}`,
          displays.weekday.displayCount,
          displays.weekday.specialChars,
        ),
      );
    } else {
      displays.weekday.show('');
    }

    if (!this.bootAnimationCompleted) {
      this.processBootAnimation(now.getTime());
    }
  }

  onInputReceived(e: KeyboardEvent): boolean | undefined {
    switch (e.key) {
      case '1':
        this.showTime = !this.showTime;
        return true;
      case '2':
        this.showDate = !this.showDate;
        return true;
      case '3':
        this.showWeekday = !this.showWeekday;
        return true;
      case 'v':
        this.showVersion = !this.showVersion;
        return true;
    }
  }

  private processBootAnimation(now: number): void {
    const timeDelta = now - this.bootTime;
    this.showDate = timeDelta > 100;
    this.showWeekday = timeDelta > 200;

    if (timeDelta > 300) {
      this.bootAnimationCompleted = true;
    }
  }
}
