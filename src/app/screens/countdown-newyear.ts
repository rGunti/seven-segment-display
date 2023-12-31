import { formatTime } from '../../utils';
import { RenderArgs, Screen } from '../base';
import { MainDisplayCollection } from '../collection';

const DAY = 24 * 60 * 60;
const DAY_MS = DAY * 1000;

function addSpaces(str: string): string {
  return str
    .split('')
    .reduce(
      (acc, char, idx) => (acc += idx > 0 && idx % 2 == 0 ? ` ${char}` : char),
      '',
    );
}

export class NewYearCountdownScreen implements Screen<MainDisplayCollection> {
  private readonly newYear = new Date(
    new Date().getFullYear() + 1,
    0,
    1,
    0,
    0,
    0,
    0,
  );

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    const { displays } = renderArgs;
    const now = new Date();
    const timeDiff = this.newYear.getTime() - now.getTime();

    let timeString: string;
    let additional = '';
    if (timeDiff >= DAY_MS) {
      const days = Math.floor(timeDiff / DAY_MS);
      timeString = addSpaces(`${days} d`.padStart(6, ' '));
    } else if (timeDiff >= 0) {
      timeString = formatTime(
        timeDiff / 1000,
        timeDiff % 1000 > 500 ? ' ' : ':',
      );
    } else {
      timeString = addSpaces(`${this.newYear.getFullYear()}`);
      additional = 'Happy New Year!';
    }
    displays.main.show(timeString);
    displays.date.showCenter(additional);
  }
}
