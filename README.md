# Video File Converter

Repo for https://worksoffline.app/video-converter

## Dev

```bash
npm install
npm run copy-ffmpeg
npm run dev
```

## FFmpeg Update

FFmpeg gets cached on its own. To update ffmpeg copy new files to `public/lib/ffmpeg` and set new version number in `.env`. This would udpate the cached version.

## Browser & Server Requirements

Browser must support Shared Array Buffer.
Cross Origin Isolation Headers: https://developer.chrome.com/blog/enabling-shared-array-buffer/#cross-origin-isolation

## FFMPEG References

| format | options                                                |
| ------ | ------------------------------------------------------ |
| h264   | https://trac.ffmpeg.org/wiki/Encode/H.264              |
| h265   | https://trac.ffmpeg.org/wiki/Encode/H.265              |
| VP8    |  https://trac.ffmpeg.org/wiki/Encode/VP8               |
| Theora | https://trac.ffmpeg.org/wiki/TheoraVorbisEncodingGuide |

## Credits

This project was only made possible by the work of wonderful people who publish open source libraries.

- https://github.com/ffmpegwasm/ffmpeg.wasm
- https://svelte.dev/
- https://github.com/ItalyPaleAle/svelte-spa-router
- https://vitejs.dev/
- https://vite-pwa-org.netlify.app/
- https://tailwindcss.com/
- https://lodash.com/
