export function repeat(str: string, amount: number): string {
  let sum = '';
  for (let i = 0; i < amount; i++) {
    sum += str;
  }
  return sum;
}

export function repeatArr<T>(fn: () => T, amount: number): T[] {
  const sum: T[] = [];
  for (let i = 0; i < amount; i++) {
    sum.push(fn());
  }
  return sum;
}

export function calcStringLength(
  str: string,
  ignoreChars: Set<string>,
): number {
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

export function scrollToPosition(
  str: string,
  width: number,
  ignoreChars: string[] = [],
  position: number,
): string {
  const ignoreCharSet = new Set<string>(ignoreChars);
  const strLen = calcStringLength(str, ignoreCharSet);
  if (strLen <= width) {
    return center(str, width, ignoreChars);
  }

  let startPosition = position;
  if (startPosition >= 0) {
    if (startPosition > strLen) {
      startPosition = 0;
    } else if (ignoreCharSet.has(str[startPosition])) {
      startPosition++;
    }
  }

  let returnString = '';
  while (calcStringLength(returnString, ignoreCharSet) < width) {
    returnString += startPosition < 0 ? ' ' : str[startPosition];
    startPosition++;
    if (startPosition >= str.length) {
      break;
    }
  }
  if (returnString.length < width) {
    returnString += repeat(' ', width - returnString.length);
  }
  return returnString;
}
