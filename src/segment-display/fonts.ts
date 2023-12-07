export const DEFAULT_KEY = '_DEFAULT';
export const SIXTEEN_FONT: SegmentDisplayFont<SixteenSegmentId> = {
  [DEFAULT_KEY]: ['d1', 'd2', 'l', 'm'],
  ' ': [],
  '!': ['b', 'dec'],
  '"': ['b', 'h'],
  '#': ['b', 'c', 'd2', 'g2', 'h', 'i'],
  $: ['a1', 'a2', 'c', 'd1', 'd2', 'f', 'g1', 'g2', 'h', 'i'],
  '%': ['a1', 'd2', 'k', 'm'],
  '&': ['a1', 'd1', 'd2', 'e', 'f', 'g1', 'h', 'l'],
  "'": ['h'],
  '(': ['a1', 'd1', 'e', 'f'],
  ')': ['a2', 'b', 'c', 'd2'],
  '*': ['j', 'h', 'k', 'm', 'i', 'l', 'g1', 'g2'],
  '+': ['g1', 'g2', 'h', 'i'],
  ',': ['m'],
  '-': ['g1', 'g2'],
  '.': ['dec'],
  '/': ['k', 'm'],
  0: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f', 'k', 'm'],
  1: ['b', 'c', 'k'],
  2: ['a1', 'a2', 'b', 'd1', 'd2', 'e', 'g1', 'g2'],
  3: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'g1', 'g2'],
  4: ['b', 'c', 'f', 'g1', 'g2'],
  5: ['a1', 'a2', 'c', 'd1', 'd2', 'f', 'g1', 'g2'],
  6: ['a1', 'a2', 'f', 'g1', 'g2', 'c', 'd1', 'd2', 'e'],
  7: ['a1', 'a2', 'b', 'c'],
  8: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f', 'g1', 'g2'],
  9: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'f', 'g1', 'g2'],
  ':': ['dec', 'dec2'],
  ';': ['dec', 'dec2', 'd2'],
  '<': ['k', 'l'],
  '=': ['d1', 'd2', 'g1', 'g2'],
  '>': ['j', 'm'],
  '?': ['a1', 'a2', 'b', 'g2', 'i'],
  '@': ['a1', 'a2', 'b', 'c', 'd2', 'e', 'f', 'g2', 'i'],
  A: ['a1', 'a2', 'b', 'c', 'e', 'f', 'g1', 'g2'],
  B: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'h', 'i', 'g2'],
  C: ['a1', 'a2', 'd1', 'd2', 'e', 'f'],
  D: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'h', 'i'],
  E: ['a1', 'a2', 'd1', 'd2', 'e', 'f', 'g1', 'g2'],
  F: ['a1', 'a2', 'e', 'f', 'g1', 'g2'],
  G: ['a1', 'a2', 'c', 'd1', 'd2', 'e', 'f', 'g2'],
  H: ['b', 'c', 'e', 'f', 'g1', 'g2'],
  I: ['a1', 'a2', 'd1', 'd2', 'h', 'i'],
  J: ['b', 'c', 'd1', 'd2', 'e'],
  K: ['e', 'f', 'g1', 'k', 'l'],
  L: ['d1', 'd2', 'e', 'f'],
  M: ['b', 'c', 'e', 'f', 'j', 'k'],
  N: ['b', 'c', 'e', 'f', 'j', 'l'],
  O: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f'],
  P: ['a1', 'a2', 'b', 'e', 'f', 'g1', 'g2'],
  Q: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f', 'l'],
  R: ['a1', 'a2', 'b', 'e', 'f', 'g1', 'g2', 'l'],
  S: ['a1', 'a2', 'd1', 'd2', 'f', 'g1', 'l'],
  T: ['a1', 'a2', 'h', 'i'],
  U: ['b', 'c', 'd1', 'd2', 'e', 'f'],
  V: ['e', 'f', 'k', 'm'],
  W: ['b', 'c', 'e', 'f', 'l', 'm'],
  X: ['j', 'k', 'm', 'l'],
  Y: ['i', 'j', 'k'],
  Z: ['a1', 'a2', 'd1', 'd2', 'k', 'm'],
  '[': ['a1', 'a2', 'd1', 'd2', 'e', 'f'],
  '\\': ['j', 'l'],
  ']': ['a1', 'a2', 'b', 'c', 'd1', 'd2'],
  '^': ['b', 'k'],
  _: ['d1', 'd2'],
  '`': ['j'],
  a: ['a1', 'a2', 'b', 'c', 'e', 'f', 'g1', 'g2'],
  b: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'h', 'i', 'g2'],
  c: ['a1', 'a2', 'd1', 'd2', 'e', 'f'],
  d: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'h', 'i'],
  e: ['a1', 'a2', 'd1', 'd2', 'e', 'f', 'g1', 'g2'],
  f: ['a1', 'a2', 'e', 'f', 'g1', 'g2'],
  g: ['a1', 'a2', 'c', 'd1', 'd2', 'e', 'f', 'g2'],
  h: ['b', 'c', 'e', 'f', 'g1', 'g2'],
  i: ['a1', 'a2', 'd1', 'd2', 'h', 'i'],
  j: ['b', 'c', 'd1', 'd2', 'e'],
  k: ['e', 'f', 'g1', 'k', 'l'],
  l: ['d1', 'd2', 'e', 'f'],
  m: ['b', 'c', 'e', 'f', 'j', 'k'],
  n: ['b', 'c', 'e', 'f', 'j', 'l'],
  o: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f'],
  p: ['a1', 'a2', 'b', 'e', 'f', 'g1', 'g2'],
  q: ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f', 'l'],
  r: ['a1', 'a2', 'b', 'e', 'f', 'g1', 'g2', 'l'],
  s: ['a1', 'a2', 'd1', 'd2', 'f', 'g1', 'l'],
  t: ['a1', 'a2', 'h', 'i'],
  u: ['b', 'c', 'd1', 'd2', 'e', 'f'],
  v: ['e', 'f', 'k', 'm'],
  w: ['b', 'c', 'e', 'f', 'l', 'm'],
  x: ['j', 'k', 'm', 'l'],
  y: ['i', 'j', 'k'],
  z: ['a1', 'a2', 'd1', 'd2', 'k', 'm'],
  '{': ['a2', 'd2', 'g1', 'h', 'i'],
  '|': ['h', 'i'],
  '}': ['a1', 'd1', 'g2', 'h', 'i'],
  '§': [
    'a1',
    'a2',
    'b',
    'c',
    'd1',
    'd2',
    'e',
    'f',
    'g1',
    'g2',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'dec',
    'dec2',
  ],
};
export const SIXTEEN_FONT_SPECIAL = new Set<string>(['.', ':']);

export const SEVEN_FONT: SegmentDisplayFont<SevenSegmentId> = {
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
  '.': ['dec'],
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
};
export const SEVEN_FONT_SPECIAL = new Set<string>(['.']);

export declare type SegmentDisplayFont<TSegmentId> = Record<
  string,
  TSegmentId[]
>;

export declare type SegmentId = SevenSegmentId | SixteenSegmentId;

export declare type SevenSegmentId =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'dec';
export declare type SixteenSegmentId =
  | 'a1'
  | 'a2'
  | 'b'
  | 'c'
  | 'd1'
  | 'd2'
  | 'e'
  | 'f'
  | 'g1'
  | 'g2'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'dec'
  | 'dec2';
