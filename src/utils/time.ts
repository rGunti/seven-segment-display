export function formatTime(time: number): string {
  // Takes the number of seconds and formats it into the format HH:mm:ss, including padding 0
  // eslint-disable-next-line no-bitwise
  const hours = ~~(time / 3600);
  // eslint-disable-next-line no-bitwise
  const minutes = ~~((time % 3600) / 60);
  // eslint-disable-next-line no-bitwise
  const seconds = ~~time % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
  }
}
