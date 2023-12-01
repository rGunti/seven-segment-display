import {
  FancySevenSegmentDisplay,
  SegmentDisplay,
  SegmentDisplayController,
} from './segment-display';
import { SixteenSegmentDisplay } from './segment-display/16seg';
import { SEVEN_FONT, SIXTEEN_FONT } from './segment-display/fonts';
import './style.scss';

function generateCharArray(...range: [number, number][]): string[] {
  const output = [];
  for (const singleRange of range) {
    const min = singleRange[0];
    const max = singleRange[1];
    for (let i = min; i <= max; i++) {
      output.push(String.fromCharCode(i));
    }
  }
  return output;
}

const appRoot = document.querySelector<HTMLDivElement>('#app');
if (!appRoot) {
  throw new Error('App Root not found');
}

appRoot.innerHTML = `
  <div id="sixteen-seg-display" class="display"></div>
  <div id="ref-display" class="display"></div>
`;

let currentCharIndex = 0;
const CHARS_TO_SHOW = generateCharArray(
  /*  [48, 57], // 0-9
  [65, 90], // A-Z
  [97, 122], // a-z
*/ [32, 127],
); /*.concat(['.', ':', '-', '_'])*/

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const HOST = appRoot.querySelector<HTMLDivElement>('#sixteen-seg-display')!;
const SIXTEEN_SEGS: SegmentDisplay[] = [
  new SixteenSegmentDisplay(HOST),
  new SixteenSegmentDisplay(HOST),
  new SixteenSegmentDisplay(HOST),
  new SixteenSegmentDisplay(HOST),
  new SixteenSegmentDisplay(HOST),
  new SixteenSegmentDisplay(HOST),
  new SixteenSegmentDisplay(HOST),
];
const CONTROLLER = new SegmentDisplayController(SIXTEEN_SEGS, SIXTEEN_FONT);
CONTROLLER.show('§§§§§§§');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const REF_HOST = appRoot.querySelector<HTMLDivElement>('#ref-display')!;
const SEVEN_SEGS: SegmentDisplay[] = [
  new FancySevenSegmentDisplay(REF_HOST),
  new FancySevenSegmentDisplay(REF_HOST),
  new FancySevenSegmentDisplay(REF_HOST),
  new FancySevenSegmentDisplay(REF_HOST),
  new FancySevenSegmentDisplay(REF_HOST),
  new FancySevenSegmentDisplay(REF_HOST),
  new FancySevenSegmentDisplay(REF_HOST),
];
const REF_CONTROLLER = new SegmentDisplayController(SEVEN_SEGS, SEVEN_FONT);

/**/
setInterval(() => {
  let renderValue = ``;
  for (let i = 0; i < SIXTEEN_SEGS.length; i++) {
    renderValue += CHARS_TO_SHOW[(currentCharIndex + i) % CHARS_TO_SHOW.length];
  }
  CONTROLLER.show(renderValue);
  REF_CONTROLLER.show(renderValue);
  currentCharIndex = (currentCharIndex + 1) % CHARS_TO_SHOW.length;
}, 250);
/**/
