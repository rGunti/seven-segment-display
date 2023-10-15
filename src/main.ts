import {
  ColonDisplay,
  SIXTEEN_FONT_PINS,
  SegmentDisplayController,
  SixteenSegmentDisplay,
} from './segment-display';
import dateFormat from 'dateformat';
import './style.scss';
import { SIXTEEN_FONT, SIXTEEN_FONT_SPECIAL } from './segment-display/fonts';
import { center, left } from './utils';

const MODE_CLOCK = 0;
const MODE_DEBUG_CHARS = 1;

const appRoot = document.querySelector<HTMLDivElement>('#app');
if (!appRoot) {
  throw new Error('App Root not found!');
}
appRoot.innerHTML = `
  <div id="time-display" class="display"></div>
  <div id="date-display" class="display"></div>
  <div id="demo-display" class="display"></div>
`;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const timeContainer = document.getElementById('time-display')!;

const DIGITS = [
  new SixteenSegmentDisplay(timeContainer),
  new SixteenSegmentDisplay(timeContainer),
  new ColonDisplay(timeContainer),
  new SixteenSegmentDisplay(timeContainer),
  new SixteenSegmentDisplay(timeContainer),
  new ColonDisplay(timeContainer),
  new SixteenSegmentDisplay(timeContainer),
  new SixteenSegmentDisplay(timeContainer),
];
const CONTROLLER = new SegmentDisplayController(
  DIGITS,
  SIXTEEN_FONT
  //SIXTEEN_FONT_SPECIAL
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const dateContainer = document.getElementById('date-display')!;
const DATE_CONTROLLER = new SegmentDisplayController(
  [
    new SixteenSegmentDisplay(dateContainer),
    new SixteenSegmentDisplay(dateContainer),
    new SixteenSegmentDisplay(dateContainer),
    new SixteenSegmentDisplay(dateContainer),
    new SixteenSegmentDisplay(dateContainer),
    new SixteenSegmentDisplay(dateContainer),
    new SixteenSegmentDisplay(dateContainer),
    new SixteenSegmentDisplay(dateContainer),
    new SixteenSegmentDisplay(dateContainer),
    new SixteenSegmentDisplay(dateContainer),
    new SixteenSegmentDisplay(dateContainer),
  ],
  SIXTEEN_FONT,
  SIXTEEN_FONT_SPECIAL
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const weekdayContainer = document.getElementById('demo-display')!;
const WEEKDAY_CONTROLLER = new SegmentDisplayController(
  [
    new SixteenSegmentDisplay(weekdayContainer),
    new SixteenSegmentDisplay(weekdayContainer),
    new SixteenSegmentDisplay(weekdayContainer),
    new SixteenSegmentDisplay(weekdayContainer),
    new SixteenSegmentDisplay(weekdayContainer),
    new SixteenSegmentDisplay(weekdayContainer),
    new SixteenSegmentDisplay(weekdayContainer),
    new SixteenSegmentDisplay(weekdayContainer),
    new SixteenSegmentDisplay(weekdayContainer),
    new SixteenSegmentDisplay(weekdayContainer),
    new SixteenSegmentDisplay(weekdayContainer),
  ],
  SIXTEEN_FONT,
  SIXTEEN_FONT_SPECIAL
);

function getCurrentTimeAsString(): string {
  const now = new Date();
  const format = now.getMilliseconds() < 500 ? 'HH:MM:ss' : 'HH MM ss';
  return dateFormat(now, format);
}

function getCurrentDateAsString(): string {
  return dateFormat(new Date(), 'dd. mmm. yyyy');
}

let mode = MODE_CLOCK;

window.addEventListener('keydown', (e) => {
  e.preventDefault();
  console.log('keydown', e.key);

  switch (e.key) {
    case 'd':
      mode = MODE_DEBUG_CHARS;
      break;
    case 'c':
    case 'Escape':
      mode = MODE_CLOCK;
      break;
  }
});

const MODES: Record<number, () => void> = {
  [MODE_CLOCK]: () => {
    const renderValue = getCurrentTimeAsString();
    CONTROLLER.show(renderValue);
    DATE_CONTROLLER.show(
      center(
        getCurrentDateAsString(),
        DATE_CONTROLLER.displayCount,
        DATE_CONTROLLER.specialChars
      )
    );
    WEEKDAY_CONTROLLER.show(
      center(
        `${dateFormat(new Date(), 'dddd')}`,
        WEEKDAY_CONTROLLER.displayCount,
        WEEKDAY_CONTROLLER.specialChars
      )
    );
  },
  [MODE_DEBUG_CHARS]: () => {
    const pinIndex = Math.floor(new Date().getTime() / 1000) % 16;
    const pin = SIXTEEN_FONT_PINS[pinIndex];
    CONTROLLER.show(
      left(pin, CONTROLLER.displayCount, CONTROLLER.specialChars)
    );
    CONTROLLER.displays[6].setSegments([pin]);
    CONTROLLER.displays[7].setSegments([pin]);
    DATE_CONTROLLER.show(
      center(
        'SEGMENT',
        DATE_CONTROLLER.displayCount,
        DATE_CONTROLLER.specialChars
      )
    );
    WEEKDAY_CONTROLLER.show(
      center(
        'DEBUG',
        WEEKDAY_CONTROLLER.displayCount,
        WEEKDAY_CONTROLLER.specialChars
      )
    );
  },
};

/**/
setInterval(() => {
  MODES[mode]();
}, 50);
/**/
