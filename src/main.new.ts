import { App } from './app';

const appRoot = document.querySelector<HTMLDivElement>('#app');
if (!appRoot) {
  throw new Error('App Root not found!');
}

const APP = new App(appRoot);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as unknown as any).APP = APP;
setTimeout(() => {
  APP.registerEvents();
  APP.startTicking();
}, 100);
