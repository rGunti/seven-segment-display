import {
  FancySevenSegmentDisplay,
  SegmentDisplay,
  SegmentDisplayController,
} from './segment-display';
import { SixteenSegmentDisplay } from './segment-display/16seg';
import { SEVEN_FONT, SIXTEEN_FONT } from './segment-display/fonts';
import { DotMatrixDisplay } from './segment-display/matrix';
import { MATRIX_DEBUG_FONT, MATRIX_FONT } from './segment-display/matrix/font';
import './style.scss';
import { repeatArr } from './utils';

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
  <div id="matrix-display" class="display"></div>
  <div id="matrix-debug-display" class="display"></div>
`;

let currentCharIndex = 0;
const CHARS_TO_SHOW = generateCharArray(
  /*  [48, 57], // 0-9
  [65, 90], // A-Z
  [97, 122], // a-z
*/ [32, 127],
); /*.concat(['.', ':', '-', '_'])*/

const PARAM = new URLSearchParams(window.location.search);
const CHAR_COUNT_STR = PARAM.get('count') || '10';
const CHAR_COUNT = parseInt(CHAR_COUNT_STR, 10);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const HOST = appRoot.querySelector<HTMLDivElement>('#sixteen-seg-display')!;
const SIXTEEN_SEGS: SegmentDisplay[] = repeatArr(
  () => new SixteenSegmentDisplay(HOST),
  CHAR_COUNT,
);
const CONTROLLER = new SegmentDisplayController(SIXTEEN_SEGS, SIXTEEN_FONT);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const REF_HOST = appRoot.querySelector<HTMLDivElement>('#ref-display')!;
const SEVEN_SEGS: SegmentDisplay[] = repeatArr(
  () => new FancySevenSegmentDisplay(REF_HOST),
  CHAR_COUNT,
);
const REF_CONTROLLER = new SegmentDisplayController(SEVEN_SEGS, SEVEN_FONT);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const MATRIX_HOST = appRoot.querySelector<HTMLDivElement>('#matrix-display')!;
const MATRIX_SEGS: SegmentDisplay[] = repeatArr(
  () => new DotMatrixDisplay(MATRIX_HOST),
  CHAR_COUNT,
);
const MATRIX_CONTROLLER = new SegmentDisplayController(
  MATRIX_SEGS,
  MATRIX_FONT,
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const MATRIX_DEBUG_HOST = appRoot.querySelector<HTMLDivElement>(
  '#matrix-debug-display',
)!;
const MATRIX_DEBUG_SEGS: SegmentDisplay[] = repeatArr(
  () => new DotMatrixDisplay(MATRIX_DEBUG_HOST),
  10,
);
const MATRIX_DEBUG_CONTROLLER = new SegmentDisplayController(
  MATRIX_DEBUG_SEGS,
  MATRIX_DEBUG_FONT,
);

const DISPLAY_STR = PARAM.get('displayStr');
const DISABLE_INTERVAL = DISPLAY_STR || PARAM.get('disableInterval') === '1';

/**/
if (!DISABLE_INTERVAL) {
  setInterval(() => {
    let renderValue = ``;
    for (let i = 0; i < SIXTEEN_SEGS.length; i++) {
      renderValue +=
        CHARS_TO_SHOW[(currentCharIndex + i) % CHARS_TO_SHOW.length];
    }
    CONTROLLER.show(renderValue);
    REF_CONTROLLER.show(renderValue);
    MATRIX_CONTROLLER.show(renderValue);
    MATRIX_DEBUG_CONTROLLER.show(renderValue);
    currentCharIndex = (currentCharIndex + 1) % CHARS_TO_SHOW.length;
  }, 250);
} else {
  CONTROLLER.show(DISPLAY_STR || '');
  REF_CONTROLLER.show(DISPLAY_STR || '');
  MATRIX_CONTROLLER.show(DISPLAY_STR || '');
  MATRIX_DEBUG_CONTROLLER.show(DISPLAY_STR || '');
}
/**/

window['DISPLAY'] = {
  CONTROLLER,
  REF_CONTROLLER,
  MATRIX_CONTROLLER,
  MATRIX_DEBUG_CONTROLLER,
  show: (str: string) => {
    CONTROLLER.show(str);
    REF_CONTROLLER.show(str);
    MATRIX_CONTROLLER.show(str);
    MATRIX_DEBUG_CONTROLLER.show(str);
    window.location.search = `?displayStr=${encodeURIComponent(
      str,
    )}&count=${CHAR_COUNT}`;
  },
};
