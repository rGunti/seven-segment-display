import { App } from './app';
import { DisplayStyle } from './app/settings/base';
import { Logger } from './log';
import './style.scss';
import './styles/config.scss';

const LOG = new Logger('CONFIG.html');

function abort(error: string) {
  alert(error);
  return new Error(error);
}

function onAppChanged(value: string) {
  LOG.info('Changing app to', value);
  document.querySelectorAll('[data-show-when-app]').forEach((i) => {
    (i as HTMLElement).style.display = 'none';
  });
  document.querySelectorAll(`[data-show-when-app="${value}"]`).forEach((i) => {
    (i as HTMLElement).style.display = '';
  });
}

function onTimeDisplayChange(value: DisplayStyle, app: App) {
  LOG.info('Changing time display to', value);
  app.setTimeDisplayStyle(value);
}

LOG.info('Initializing app');
const previewRoot = document.querySelector<HTMLDivElement>('#preview');
if (!previewRoot) {
  throw abort('Preview Root not found!');
}

const previewApp = new App(previewRoot);

const form = document.querySelector<HTMLFormElement>('#launchForm');
if (!form) {
  throw abort('Form not found!');
}

const appDropdown = form.querySelector<HTMLSelectElement>('select[name=app]');
if (!appDropdown) {
  throw abort('App dropdown missing');
}

const timeStyleDropdown = form.querySelector<HTMLSelectElement>(
  'select[name=timeStyle]',
);
if (!timeStyleDropdown) {
  throw abort('Time style dropdown missing');
}

appDropdown.onchange = (e) =>
  onAppChanged((e?.target as HTMLSelectElement)?.value);
timeStyleDropdown.onchange = (e) =>
  onTimeDisplayChange(
    (e.target as HTMLSelectElement).value as DisplayStyle,
    previewApp,
  );

setTimeout(() => {
  onAppChanged(appDropdown.value);
  onTimeDisplayChange(timeStyleDropdown.value as DisplayStyle, previewApp);
  previewApp.startTicking();
}, 100);
