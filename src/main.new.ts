import { App } from './app';

const appRoot = document.querySelector<HTMLDivElement>('#app');
if (!appRoot) {
  throw new Error('App Root not found!');
}

const APP = new App(appRoot);
setTimeout(() => {
  APP.startTicking();
}, 100);
