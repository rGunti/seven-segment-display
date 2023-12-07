export function isWpeEnabled() {
  return window.wallpaperRegisterMediaPlaybackListener !== undefined;
}
