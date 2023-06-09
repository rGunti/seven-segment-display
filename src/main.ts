import { FancySevenSegmentDisplay, SevenSegmentDigit } from './segment-display';
import './style.scss';

const appRoot = document.querySelector<HTMLDivElement>('#app');
if (!appRoot) {
  throw new Error('App Root not found!');
}
appRoot.innerHTML = `
  <div id="display">
  </div>

  <div id="svg-display" style="height: 250px">
  </div>
`;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('display')!;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const svgContainer = document.getElementById('svg-display')!;

const DIGITS = [
  new SevenSegmentDigit(container),
  new SevenSegmentDigit(container),
  new SevenSegmentDigit(container),
  new SevenSegmentDigit(container),
];
const FANCY_DIGITS = [
  new FancySevenSegmentDisplay(svgContainer),
  new FancySevenSegmentDisplay(svgContainer),
  new FancySevenSegmentDisplay(svgContainer),
  new FancySevenSegmentDisplay(svgContainer),
];

let i = 0;
const INC = 1;
const INT = 10;
const MAX = Math.pow(16, DIGITS.length);
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

setInterval(() => {
  tick();
  const renderValue = `${repeatStr('0', DIGITS.length)}${i.toString(
    16
  )}`.toUpperCase();
  for (let idx = 0; idx < DIGITS.length; idx++) {
    DIGITS[idx].setDigit(renderValue[renderValue.length - DIGITS.length + idx]);
    FANCY_DIGITS[idx].setDigit(
      renderValue[renderValue.length - DIGITS.length + idx]
    );
  }
}, INT);
