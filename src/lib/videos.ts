import collections from '../../content/videos.json';

export type VideoCollection = (typeof collections)[number];
export type Video = VideoCollection['videos'][number];

export const VIDEO_COLLECTIONS: VideoCollection[] = collections;

export const ALL_VIDEOS: { video: Video; collection: VideoCollection }[] = collections.flatMap((collection) =>
  collection.videos.map((video) => ({ video, collection }))
);

export const videoPath = (v: Video) => `/videos/${v.slug}`;

/** The old site titled video pages with the `title` field, falling back to `name`. */
export const videoTitle = (v: Video) => v.title || v.name;
