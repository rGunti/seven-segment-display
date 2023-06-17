import { center } from '../src/utils';

describe('centering text', () => {
  it.each([
    ['hello world', 16, [], '  hello world   '],
    ['test', 4, [], 'test'],
    ['test', 6, [], ' test '],
    ['test', 2, [], 'test'],
    ['01.23', 6, ['.'], ' 01.23 '],
    ['2023-06-17', 12, ['.'], ' 2023-06-17 '],
    ['2023.06.17', 12, ['.'], '  2023.06.17  '],
  ])(
    'when the input is "%s" with requested with length of %f while ignoring %s, expect "%s"',
    (inputText, width, ignoreChars, expectedOutput) => {
      expect(center(inputText, width, ignoreChars)).toBe(expectedOutput);
    }
  );
});
