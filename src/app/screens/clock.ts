import dateFormat from 'dateformat';
import { center } from '../../utils';
import { RenderArgs, Screen } from '../base';
import { MainDisplayCollection } from '../collection';

export class ClockScreen implements Screen<MainDisplayCollection> {
  private bootAnimationCompleted = false;
  private showTime = true;
  private showDate = false;
  private showWeekday = false;

  private readonly bootTime = new Date().getTime();

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    const { displays, now } = renderArgs;
    if (this.showTime) {
      displays.main.show(
        dateFormat(now, now.getMilliseconds() < 500 ? 'HH:MM:ss' : 'HH MM ss'),
      );
    }

    if (this.showDate) {
      displays.date.show(
        center(
          dateFormat(now, 'dd mmmm yyyy'),
          displays.date.displayCount,
          displays.date.specialChars,
        ),
      );
    }

    if (this.showWeekday) {
      displays.weekday.show(
        center(
          `${dateFormat(now, 'dddd')}`,
          displays.weekday.displayCount,
          displays.weekday.specialChars,
        ),
      );
    }

    if (!this.bootAnimationCompleted) {
      this.processBootAnimation(now.getTime());
    }
  }

  private processBootAnimation(now: number): void {
    const timeDelta = now - this.bootTime;
    this.showDate = timeDelta > 100;
    this.showWeekday = timeDelta > 200;
  }
}
