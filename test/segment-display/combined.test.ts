import { SegmentDisplayController } from '../../src/segment-display';
import { FakeSegmentDisplay } from '../../src/segment-display/7seg';
import { DIGIT_SEGMENTS } from '../../src/segment-display/internal';

function constructDisplay(characters: number): SegmentDisplayController {
  const displays: FakeSegmentDisplay[] = [];
  for (let i = 0; i < characters; i++) {
    displays.push(new FakeSegmentDisplay());
  }
  return new SegmentDisplayController(displays);
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
      DIGIT_SEGMENTS[1],
      DIGIT_SEGMENTS[2],
      DIGIT_SEGMENTS[3],
      DIGIT_SEGMENTS[4],
      DIGIT_SEGMENTS[5],
      DIGIT_SEGMENTS[6],
      DIGIT_SEGMENTS[7],
      DIGIT_SEGMENTS[8],
      DIGIT_SEGMENTS[9],
      DIGIT_SEGMENTS[0],
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
      DIGIT_SEGMENTS[1],
      [...DIGIT_SEGMENTS[2], 'h'],
      DIGIT_SEGMENTS[3],
      DIGIT_SEGMENTS[4],
    ].map((i) => i.sort())
  );
});
