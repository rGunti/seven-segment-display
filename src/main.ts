import {
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
  <div id="svg-display" class="display-main">
  </div>
`;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const svgContainer = document.getElementById('svg-display')!;

const DIGITS = [
  new FancySevenSegmentDisplay(svgContainer),
  new FancySevenSegmentDisplay(svgContainer),
  new FancySevenSegmentDisplay(svgContainer),
  new FancySevenSegmentDisplay(svgContainer),
  new FancySevenSegmentDisplay(svgContainer),
  new FancySevenSegmentDisplay(svgContainer),
];
const CONTROLLER = new SegmentDisplayController(DIGITS);

let i = 0;
const RDX = 10;
const INC = 0.01;
const INT = 50;
const MAX = Math.pow(RDX, DIGITS.length);
function tick() {
  i = (i + INC) % MAX;
}

function repeatStr(str: string, num: number): string {
  let s = ``;
  for (let i = 0; i < num; i++) {
    s += str;
  }
  return s;
}

function getCurrentTimeAsString(): string {
  const now = new Date();
  const format = now.getMilliseconds() > 500 ? 'HH.MM.ss' : 'HHMMss';
  return dateFormat(new Date(), format);
}

/**/
setInterval(() => {
  //tick();
  //const renderValue = `${i.toFixed(2)}`.toUpperCase();
  const renderValue = getCurrentTimeAsString();
  CONTROLLER.show(renderValue);
}, INT);
/**/
