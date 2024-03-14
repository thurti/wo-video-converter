import type { SelectedSettings } from "./store";
import type { UIInputItem } from "./types/UIInputItem";

export const config = {
  debug: false,
  disableServiceWorker: false,
  updateInterval: 20000,
  version: import.meta.env.PACKAGE_VERSION,
  url: "https://worksoffline.app/video-converter",
  github: "https://github.com/thurti/wo-video-converter",
  title: "Video File Converter",
  titleHeader: "Video\nFile Converter",
  localStoragePrefix: "wo-video-converter",
  notificationIcon: "/icons/android-chrome-192x192.png",
  colorScheme: "zinc-indigo",
  allowedFormats: "video/*",
  maxFileSizeMb: 2000, //2GB hard wasm max
  fileDropLabel: "Add Video Files",
  formats: <ConfigFormats>{
    id: "format",
    label: "Convert to Format",
    value: "format",
    options: [
      {
        id: "mp4",
        label: "MP4",
        value: "MP4",
        ext: "mp4",
        mimetype: "video/mp4",
        isDefault: true,
      },
      {
        id: "webm",
        label: "WEBM",
        value: "WEBM",
        ext: "webm",
        mimetype: "video/webm",
      },
      {
        id: "ogv",
        label: "OGV",
        value: "OGV",
        ext: "ogv",
        mimetype: "video/ogg",
      },
      {
        id: "gif",
        label: "GIF",
        value: "GIF",
        ext: "gif",
        mimetype: "image/gif",
      },
    ],
  },
  settings: <ConfigSettings>{
    mp4: [
      {
        id: "mp4-vcodec",
        label: "Video Codec",
        value: "vcodec",
        options: [
          {
            id: "mp4-vcodec-h264",
            label: "H.264",
            value: "-vcodec libx264",
            isDefault: true,
          },
          { id: "mp4-vcodec-h265", label: "H.265", value: "-vcodec libx265" },
        ],
      },
      {
        id: "mp4-quality",
        label: "Quality",
        value: "quality",
        options: [
          {
            id: "mp4-quality-low",
            label: "Low",
            value: "-crf 28",
          },
          {
            id: "mp4-quality-medium",
            label: "Medium",
            value: "-crf 23",
            isDefault: true,
          },
          {
            id: "mp4-quality-high",
            label: "High",
            value: "-crf 18",
          },
          {
            id: "mp4-quality-lossless",
            label: "Lossless",
            value: "-crf 0",
          },
        ],
      },
      {
        id: "mp4-acodec",
        label: "Audio Codec",
        value: "acodec",
        options: [
          {
            id: "mp4-acodec-no-audio",
            label: "remove audio",
            value: "-an",
          },
          { id: "mp4-acodec-aac", label: "AAC", value: "-acodec aac" },
          {
            id: "mp4-acodec-mp3",
            label: "MP3",
            value: "-acodec libmp3lame",
            isDefault: true,
          },
        ],
      },
      {
        id: "mp4-resolution",
        label: "Resolution",
        value: "resolution",
        options: [
          {
            id: "mp4-source",
            label: "as source",
            value: "",
            isDefault: true,
          },
          { id: "mp4-480p", label: "480p (SD)", value: "-vf scale=854:-2" },
          { id: "mp4-720p", label: "720p (HD)", value: "-vf scale=1280:-2" },
          {
            id: "mp4-1080p",
            label: "1080p (Full HD)",
            value: "-vf scale=1920:-2",
          },
          { id: "mp4-2k", label: "2K", value: "-vf scale=2048:-2" },
        ],
      },
    ],
    webm: [
      {
        id: "webm-vcodec",
        label: "Video Codec",
        value: "vcodec",
        options: [
          {
            id: "webm-vcodec-vp8",
            label: "VP8",
            value: "-vcodec libvpx",
            isDefault: true,
          },
        ],
      },
      {
        id: "webm-quality",
        label: "Quality",
        value: "quality",
        options: [
          {
            id: "webm-quality-low",
            label: "Low",
            value: "-crf 30",
          },
          {
            id: "webm-quality-medium",
            label: "Medium",
            value: "-crf 20",
            isDefault: true,
          },
          {
            id: "webm-quality-high",
            label: "High",
            value: "-crf 10",
          },
          {
            id: "webm-quality-lossless",
            label: "Lossless",
            value: "-crf 4",
          },
        ],
      },
      {
        id: "webm-acodec",
        label: "Audio Codec",
        value: "acodec",
        options: [
          {
            id: "webm-acodec-no-audio",
            label: "remove audio",
            value: "-an",
          },
          {
            id: "webm-acodec-vorbis",
            label: "Vorbis",
            value: "-acodec libvorbis",
            isDefault: true,
          },
          { id: "webm-acodec-opus", label: "Opus", value: "-acodec libopus" },
        ],
      },
      {
        id: "webm-resolution",
        label: "Resolution",
        value: "resolution",
        options: [
          {
            id: "webm-source",
            label: "as source",
            value: "",
            isDefault: true,
          },
          { id: "webm-480p", label: "480p (SD)", value: "-vf scale=854:-2" },
          { id: "webm-720p", label: "720p (HD)", value: "-vf scale=1280:-2" },
          {
            id: "webm-1080p",
            label: "1080p (Full HD)",
            value: "-vf scale=1920:-2",
          },
          { id: "webm-2k", label: "2K", value: "-vf scale=2048:-2" },
        ],
      },
    ],
    ogv: [
      {
        id: "ogv-vcodec",
        label: "Video Codec",
        value: "vcodec",
        options: [
          {
            id: "ogv-vcodec-theora",
            label: "Theora",
            value: "-vcodec libtheora",
            isDefault: true,
          },
        ],
      },
      {
        id: "ogv-quality",
        label: "Quality",
        value: "quality",
        options: [
          {
            id: "ogv-quality-low",
            label: "Low",
            value: "-q:v 7",
          },
          {
            id: "ogv-quality-medium",
            label: "Medium",
            value: "-q:v 5",
            isDefault: true,
          },
          {
            id: "ogv-quality-high",
            label: "High",
            value: "-q:v 3",
          },
        ],
      },
      {
        id: "ogv-acodec",
        label: "Audio Codec",
        value: "acodec",
        options: [
          {
            id: "ogv-acodec-no-audio",
            label: "remove audio",
            value: "-an",
          },
          {
            id: "ogv-acodec-vorbis",
            label: "Vorbis",
            value: "-acodec libvorbis",
            isDefault: true,
          },
        ],
      },
      {
        id: "ogv-resolution",
        label: "Resolution",
        value: "resolution",
        options: [
          {
            id: "ogv-source",
            label: "as source",
            value: "",
            isDefault: true,
          },
          { id: "ogv-480p", label: "480p (SD)", value: "-vf scale=854:-2" },
          { id: "ogv-720p", label: "720p (HD)", value: "-vf scale=1280:-2" },
          {
            id: "ogv-1080p",
            label: "1080p (Full HD)",
            value: "-vf scale=1920:-2",
          },
          { id: "ogv-2k", label: "2K", value: "-vf scale=2048:-2" },
        ],
      },
    ],
    gif: [
      {
        id: "gif-fps",
        label: "Frames/sec",
        value: "fps",
        options: [
          { id: "gif-fps-10", label: "10", value: "-r 10", isDefault: true },
          { id: "gif-fps-15", label: "15", value: "-r 15" },
          { id: "gif-fps-20", label: "20", value: "-r 20" },
          { id: "gif-fps-24", label: "24", value: "-r 24" },
          { id: "gif-fps-30", label: "30", value: "-r 30" },
        ],
      },
      {
        id: "gif-scale",
        label: "Width",
        value: "scale",
        options: [
          { id: "gif-scale-source", label: "source", value: "" },
          { id: "gif-scale-80", label: "80px", value: "-vf scale=80:-1" },
          {
            id: "gif-scale-160",
            label: "160px",
            value: "-vf scale=160:-1",
          },
          {
            id: "gif-scale-320",
            label: "320px",
            value: "-vf scale=320:-1",
            isDefault: true,
          },
          { id: "gif-scale-480", label: "480px", value: "-vf scale=480:-1" },
          { id: "gif-scale-640", label: "640px", value: "-vf scale=640:-1" },
          { id: "gif-scale-800", label: "800px", value: "-vf scale=800:-1" },
        ],
      },
      {
        id: "gif-loop",
        label: "Loop",
        value: "loop",
        options: [
          { id: "gif-loop-0", label: "no loop", value: "-loop -1" },
          { id: "gif-loop-2", label: "one loop", value: "-loop 1" },
          {
            id: "gif-loop-1",
            label: "infinite",
            value: "-loop 0",
            isDefault: true,
          },
        ],
      },
    ],
  },
};

export type ConfigFormats = {
  id: string;
  label: string;
  value: string;
  options: ConfigFormatOption[];
};

export interface ConfigFormatOption extends UIInputItem {
  mimetype?: string;
  ext: string;
  isDefault?: boolean;
  isCustomPreset: boolean;
}

export type ConfigSettings = {
  [id: string]: ConfigSettingOption[];
};

export interface ConfigSettingOption extends UIInputItem<string> {
  options?: ConfigSettingOption[];
  isDefault?: boolean;
}
