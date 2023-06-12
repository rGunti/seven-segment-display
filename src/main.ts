import {
  ColonDisplay,
  FancySevenSegmentDisplay,
  SegmentDisplayController,
} from './segment-display';
import dateFormat from 'dateformat';
import './style.scss';

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
  new FancySevenSegmentDisplay(timeContainer),
  new FancySevenSegmentDisplay(timeContainer),
  new ColonDisplay(timeContainer),
  new FancySevenSegmentDisplay(timeContainer),
  new FancySevenSegmentDisplay(timeContainer),
  new ColonDisplay(timeContainer),
  new FancySevenSegmentDisplay(timeContainer),
  new FancySevenSegmentDisplay(timeContainer),
];
const CONTROLLER = new SegmentDisplayController(DIGITS);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const dateContainer = document.getElementById('date-display')!;
const DATE_CONTROLLER = new SegmentDisplayController([
  new FancySevenSegmentDisplay(dateContainer),
  new FancySevenSegmentDisplay(dateContainer),
  new FancySevenSegmentDisplay(dateContainer),
  new FancySevenSegmentDisplay(dateContainer),
  new FancySevenSegmentDisplay(dateContainer),
  new FancySevenSegmentDisplay(dateContainer),
  new FancySevenSegmentDisplay(dateContainer),
  new FancySevenSegmentDisplay(dateContainer),
  new FancySevenSegmentDisplay(dateContainer),
  new FancySevenSegmentDisplay(dateContainer),
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const demoContainer = document.getElementById('demo-display')!;
const DEMO_CONTROLLER = new SegmentDisplayController([
  new FancySevenSegmentDisplay(demoContainer),
  new FancySevenSegmentDisplay(demoContainer),
  new FancySevenSegmentDisplay(demoContainer),
  new FancySevenSegmentDisplay(demoContainer),
  new FancySevenSegmentDisplay(demoContainer),
  new FancySevenSegmentDisplay(demoContainer),
  new FancySevenSegmentDisplay(demoContainer),
  new FancySevenSegmentDisplay(demoContainer),
]);
DEMO_CONTROLLER.show('abcdefgh');

function getCurrentTimeAsString(): string {
  const now = new Date();
  const format = now.getMilliseconds() < 500 ? 'HH:MM:ss' : 'HH MM ss';
  return dateFormat(now, format);
}

function getCurrentDateAsString(): string {
  return dateFormat(new Date(), 'yyyy-mm-dd');
}

/**/
setInterval(() => {
  const renderValue = getCurrentTimeAsString();
  CONTROLLER.show(renderValue);
  DATE_CONTROLLER.show(getCurrentDateAsString());
}, 50);
/**/

console.log('Initialized', { CONTROLLER, DATE_CONTROLLER });
