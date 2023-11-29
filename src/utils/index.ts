export function repeat(str: string, amount: number): string {
  let sum = '';
  for (let i = 0; i < amount; i++) {
    sum += str;
  }
  return sum;
}

function calcStringLength(str: string, ignoreChars: Set<string>): number {
  let len = str.length;
  for (let i = 0; i < str.length; i++) {
    if (ignoreChars.has(str[i])) {
      len--;
    }
  }
  return len;
}

export function left(str: string, width: number, ignoreChars: string[] = []) {
  const strLen = calcStringLength(str, new Set<string>(ignoreChars));
  if (strLen >= width) {
    return str;
  }
  const diff = width - strLen;
  return `${str}${repeat(' ', diff)}`;
}

export function center(
  str: string,
  width: number,
  ignoreChars: string[] = [],
): string {
  const strLen = calcStringLength(str, new Set<string>(ignoreChars));
  if (strLen >= width) {
    return str;
  }
  const diff = width - strLen;
  const spacesLeft = Math.floor(diff / 2);
  const spacesRight = Math.ceil(diff / 2);
  return `${repeat(' ', spacesLeft)}${str}${repeat(' ', spacesRight)}`;
}

export function limit(
  str: string,
  width: number,
  ignoreChars: string[] = [],
): string {
  const strLen = calcStringLength(str, new Set<string>(ignoreChars));
  if (strLen >= width) {
    return str.substring(0, width);
  }
  return str;
}
