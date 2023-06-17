import { SegmentDisplayController } from '../../src/segment-display';
import { FakeSegmentDisplay } from '../../src/segment-display/7seg';
import {
  SEVEN_FONT,
  SEVEN_FONT_SPECIAL,
} from '../../src/segment-display/fonts';

function constructDisplay(characters: number): SegmentDisplayController {
  const displays: FakeSegmentDisplay[] = [];
  for (let i = 0; i < characters; i++) {
    displays.push(new FakeSegmentDisplay());
  }
  return new SegmentDisplayController(displays, SEVEN_FONT, SEVEN_FONT_SPECIAL);
}

test('display is empty when initialized', () => {
  const display = constructDisplay(3);
  expect(
    display.displays.flatMap((d) => (d as FakeSegmentDisplay).activeSegments)
  ).toEqual([]);
});

test('display shows numbers correctly', () => {
  const display = constructDisplay(10);
  display.show('1234567890');
  expect(
    display.displays.map((d) => (d as FakeSegmentDisplay).activeSegments.sort())
  ).toEqual(
    [
      SEVEN_FONT[1],
      SEVEN_FONT[2],
      SEVEN_FONT[3],
      SEVEN_FONT[4],
      SEVEN_FONT[5],
      SEVEN_FONT[6],
      SEVEN_FONT[7],
      SEVEN_FONT[8],
      SEVEN_FONT[9],
      SEVEN_FONT[0],
    ].map((i) => i.sort())
  );
});

test('displays decimal point correctly', () => {
  const display = constructDisplay(4);
  display.show('12.34');
  expect(
    display.displays.map((d) => (d as FakeSegmentDisplay).activeSegments.sort())
  ).toEqual(
    [
      SEVEN_FONT[1],
      [...SEVEN_FONT[2], 'dec'],
      SEVEN_FONT[3],
      SEVEN_FONT[4],
    ].map((i) => i.sort())
  );
});

test('clears decimal point correctly', () => {
  const display = new FakeSegmentDisplay();
  display.setSegment('dec', true);
  display.clear();

  expect(display.activeSegments).toEqual([]);
});
