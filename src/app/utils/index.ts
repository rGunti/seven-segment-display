export function createDisplayContainer(
  ...additionalClasses: string[]
): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('display');
  container.classList.add(...additionalClasses);
  return container;
}

export function jsonClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
