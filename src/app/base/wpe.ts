import {
  WallpaperMediaPlaybackEvent,
  WallpaperMediaPropertiesEvent,
  WallpaperMediaTimelineEvent,
} from 'wallpaper-engine-types';

export interface WpeEventReceiver {
  readonly supportsWpeEvents: boolean;
  onTimelineChanged(event: WallpaperMediaTimelineEvent): void;
  onPlaybackChanged(event: WallpaperMediaPlaybackEvent): void;
  onPropertyChanged(event: WallpaperMediaPropertiesEvent): void;
}
