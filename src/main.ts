import { SevenSegmentDigit } from './seven-segment-component'
import './style.scss'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="display">
  </div>

  <div id="button-digit-buttons">
  </div>
`

//setupDigits(document.querySelector<HTMLElement>('#button-digit-buttons')!);
const container = document.getElementById('display')!;

const DIGITS = [
  new SevenSegmentDigit(container),
  new SevenSegmentDigit(container),
  new SevenSegmentDigit(container),
  new SevenSegmentDigit(container),
  new SevenSegmentDigit(container),
  new SevenSegmentDigit(container),
];

let i = 0;
const INC = 98;
const MAX = Math.pow(10, DIGITS.length);
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
  const renderValue = `${repeatStr('_', DIGITS.length)}${i}`;
  for (let idx = 0; idx < DIGITS.length; idx++) {
    DIGITS[idx].setDigit(renderValue[renderValue.length - DIGITS.length + idx]);
  }
}, 10);
