import {
  FancySevenSegmentDisplay,
  SegmentDisplayController,
} from './segment-display';
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
const svgContainer = document.getElementById('svg-display')!;

const DIGITS = [
  new FancySevenSegmentDisplay(svgContainer),
  new FancySevenSegmentDisplay(svgContainer),
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
const INT = 10;
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

/**/
setInterval(() => {
  tick();
  const renderValue = `${i.toFixed(2)}`.toUpperCase();
  CONTROLLER.show(renderValue);
}, INT);
/**/
