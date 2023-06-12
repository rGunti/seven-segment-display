export const DIGIT_SEGMENTS: { [character: string]: SegmentId[] } = {
  // Digits
  0: ['a', 'b', 'c', 'd', 'e', 'f'],
  1: ['b', 'c'],
  2: ['a', 'b', 'd', 'e', 'g'],
  3: ['a', 'b', 'c', 'd', 'g'],
  4: ['b', 'c', 'f', 'g'],
  5: ['a', 'f', 'g', 'c', 'd'],
  6: ['a', 'f', 'g', 'c', 'd', 'e'],
  7: ['a', 'b', 'c'],
  8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  9: ['a', 'b', 'c', 'd', 'f', 'g'],
  // Characters
  _: [],
  '-': ['g'],
  '.': ['h'],
  ':': ['d', 'g'],
  // Letters
  A: ['a', 'b', 'c', 'e', 'f', 'g'],
  B: ['c', 'd', 'e', 'f', 'g'],
  C: ['a', 'd', 'e', 'f'],
  D: ['b', 'c', 'd', 'e', 'g'],
  E: ['a', 'd', 'e', 'f', 'g'],
  F: ['a', 'e', 'f', 'g'],
  // Debug
  a: ['a'],
  b: ['b'],
  c: ['c'],
  d: ['d'],
  e: ['e'],
  f: ['f'],
  g: ['g'],
  h: ['h'],
};

export const INTEGRATED_CHARS = ['.'];

export declare type SegmentId = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
