import dateFormat from 'dateformat';
import { formatTime } from '../../utils';
import { RenderArgs, Screen } from '../base';
import { MainDisplayCollection } from '../collection';

const HOUR = 60 * 60;
const DAY = 24 * HOUR;
const DAY_MS = DAY * 1000;

const DONE_ANIMATION = [
  //        <>         |
  '                    ',
  '         <>         ',
  '        <<>>        ',
  '       <<<>>>       ',
  '      <<<  >>>      ',
  '     <<<    >>>     ',
  '    <<<      >>>    ',
  '   <<<        >>>   ',
  '  <<<          >>>  ',
  ' <<<            >>> ',
  '<<<              >>>',
  '<<                >>',
  '<                  >',
  '                    ',
];

function addSpaces(str: string): string {
  return str
    .split('')
    .reduce(
      (acc, char, idx) => (acc += idx > 0 && idx % 2 == 0 ? ` ${char}` : char),
      '',
    );
}

export class CountdownScreen implements Screen<MainDisplayCollection> {
  private readonly target: Date;
  private readonly completedMessage: string;

  constructor(target: Date | string, completedMessage: string | null) {
    if (typeof target === 'string') {
      this.target = new Date(Date.parse(target));
    } else {
      this.target = target;
    }

    this.completedMessage = completedMessage || 'Countdown complete';
  }

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    const { displays } = renderArgs;
    const now = new Date();
    const timeDiff = this.target.getTime() - now.getTime();
    let odd = now.getMilliseconds() < 500;

    let timeString: string;
    let additional = '';
    // eslint-disable-next-line prefer-const
    let dateRow = dateFormat(
      now,
      odd ? 'dd mmm yyyy    HH MM' : 'dd mmm yyyy    HH:MM',
    );
    if (timeDiff >= DAY_MS) {
      const days = Math.floor(timeDiff / DAY_MS);
      timeString = addSpaces(`${days} D`.padStart(6, ' '));
      const remainderTime = timeDiff % DAY_MS;
      const remainderTimeStr = formatTime(remainderTime / 1000, {
        showUnits: true,
        joinWith: ' ',
      });

      additional = `${remainderTimeStr}`.padStart(13);
    } else if (timeDiff >= 0) {
      timeString = formatTime(timeDiff / 1000, {
        joinWith: odd ? ' ' : ':',
      });
    } else {
      odd = now.getSeconds() % 2 === 0;

      timeString = odd ? '' : '0:00';
      additional = odd
        ? this.completedMessage
        : DONE_ANIMATION[
            Math.floor(now.getMilliseconds() / (1000 / DONE_ANIMATION.length)) %
              DONE_ANIMATION.length
          ];
    }
    displays.main.show(timeString);
    displays.date.showCenter(additional);
    displays.weekday.show(dateRow);
  }
}
