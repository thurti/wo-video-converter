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
        id: "h265",
        label: "MP4 (H.265)",
        value: "MP4 (H.265)",
        ext: "mp4",
        mimetype: "video/mp4",
      },
      {
        id: "webm",
        label: "WEBM (VP8)",
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
        value: "-vcodec libx264",
        isDefault: true,
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
    h265: [
      {
        id: "h265-vcodec",
        label: "Video Codec",
        value: "-vcodec libx265",
        isDefault: true,
      },
      {
        id: "h265-quality",
        label: "Quality",
        value: "quality",
        options: [
          {
            id: "265-quality-low",
            label: "Low",
            value: "-crf 30",
          },
          {
            id: "265-quality-medium",
            label: "Medium",
            value: "-crf 25",
            isDefault: true,
          },
          {
            id: "265-quality-high",
            label: "High",
            value: "-crf 20",
          },
          {
            id: "265-quality-lossless",
            label: "Lossless",
            value: "-crf 0",
          },
        ],
      },
      {
        id: "h265-acodec",
        label: "Audio Codec",
        value: "acodec",
        options: [
          {
            id: "h265-acodec-no-audio",
            label: "remove audio",
            value: "-an",
          },
          { id: "h265-acodec-aac", label: "AAC", value: "-acodec aac" },
          {
            id: "h265-acodec-mp3",
            label: "MP3",
            value: "-acodec libmp3lame",
            isDefault: true,
          },
        ],
      },
      {
        id: "h265-resolution",
        label: "Resolution",
        value: "resolution",
        options: [
          {
            id: "h265-source",
            label: "as source",
            value: "",
            isDefault: true,
          },
          {
            id: "h265-480p",
            label: "480p (SD)",
            value: "-vf scale=854:-2",
          },
          {
            id: "h265-720p",
            label: "720p (HD)",
            value: "-vf scale=1280:-2",
          },
          {
            id: "h265-1080p",
            label: "1080p (Full HD)",
            value: "-vf scale=1920:-2",
          },
          { id: "h265-2k", label: "2K", value: "-vf scale=2048:-2" },
        ],
      },
    ],
    webm: [
      {
        id: "webm-vcodec",
        label: "Video Codec",
        value: "-vcodec libvpx",
        isDefault: true,
      },
      {
        id: "webm-quality",
        label: "Quality",
        value: "quality",
        options: [
          {
            id: "webm-quality-lower",
            label: "Loooow",
            value: "-crf 10 -b:v 1M",
          },
          {
            id: "webm-quality-low",
            label: "Low",
            value: "-crf 10 -b:v 2M",
          },
          {
            id: "webm-quality-medium",
            label: "Medium",
            value: "-crf 8 -b:v 5M",
            isDefault: true,
          },
          {
            id: "webm-quality-high",
            label: "High",
            value: "-crf 4 -b:v 10M",
          },
          {
            id: "webm-quality-lossless",
            label: "Ultra",
            value: "-crf 4 -b:v 20M",
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
        value: "-vcodec libtheora",
        isDefault: true,
      },
      {
        id: "ogv-quality",
        label: "Quality",
        value: "quality",
        options: [
          {
            id: "ogv-quality-low",
            label: "Low",
            value: "-q:v 3",
          },
          {
            id: "ogv-quality-medium",
            label: "Medium",
            value: "-q:v 6",
            isDefault: true,
          },
          {
            id: "ogv-quality-high",
            label: "High",
            value: "-q:v 8",
          },
          {
            id: "ogv-quality-highest",
            label: "Highest",
            value: "-q:v 10",
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
        id: "filter_complex",
        label: "Palette",
        value:
          "-filter_complex loop={gif-loop},fps={gif-fps},scale={gif-scale}[s];[s]split[a][b];[a]palettegen[palette];[b][palette]paletteuse",
        isDefault: true,
      },
      {
        id: "gif-fps",
        label: "Frames/sec",
        value: "fps",
        options: [
          { id: "gif-fps-10", label: "10", value: "10", isDefault: true },
          { id: "gif-fps-15", label: "15", value: "15" },
          { id: "gif-fps-20", label: "20", value: "20" },
          { id: "gif-fps-24", label: "24", value: "24" },
          { id: "gif-fps-30", label: "30", value: "30" },
        ],
      },
      {
        id: "gif-scale",
        label: "Width",
        value: "scale",
        options: [
          { id: "gif-scale-source", label: "source", value: "" },
          { id: "gif-scale-80", label: "80px", value: "80:-1" },
          {
            id: "gif-scale-160",
            label: "160px",
            value: "160:-1",
          },
          {
            id: "gif-scale-320",
            label: "320px",
            value: "320:-1",
            isDefault: true,
          },
          { id: "gif-scale-480", label: "480px", value: "480:-1" },
          { id: "gif-scale-640", label: "640px", value: "640:-1" },
          { id: "gif-scale-800", label: "800px", value: "800:-1" },
        ],
      },
      {
        id: "gif-loop",
        label: "Loop",
        value: "loop",
        options: [
          { id: "gif-loop-0", label: "no loop", value: "-1" },
          { id: "gif-loop-2", label: "one loop", value: "1" },
          {
            id: "gif-loop-1",
            label: "infinite",
            value: "0",
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
