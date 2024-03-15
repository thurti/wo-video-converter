<script lang="ts">
  import UiSection from "@/components/ui/UISection.svelte";
  import PageContainer from "./PageContainer.svelte";
</script>

<PageContainer title="FAQ">
  <UiSection id="slow">
    <slot slot="heading">Why is converting files so slow?</slot>
    <p>
      Encoding videos is a very CPU intensive task. Due to the limitations of
      WASM, the encoding process is about 10x slower than on a native
      application. The encoding speed also depends on the file size and the
      complexity of the video and the codec. <a
        href="https://ffmpegwasm.netlify.app/docs/performance"
        >more informations on ffmpeg wasm performance</a
      >
    </p>
    <p>
      If you are doing serious video work, you should use ffmpeg directly (not
      via browser) or use a video editing software.
    </p>
  </UiSection>

  <UiSection id="memory">
    <slot slot="heading">Why do I get memory errors?</slot>
    <p>
      The encoding process is very memory intensive. There is a limit on how
      much memory a web application can use. If you get memory errors, try to
      convert a smaller file or use a different codec.
    </p>
    <p>
      Again, if you are doing serious video stuff, you should use ffmpeg
      directly (not via browser) or use a video editing software.
    </p>
  </UiSection>

  <UiSection id="codec">
    <slot slot="heading">Why is there no support for AV1, VP9?</slot>
    <p>
      AV1 is not supported by ffmpeg wasm. VP9 is technically supported, but in
      my tests it was so memory intensive that it almost always resulted in
      memory errors. I will add VP9 support when performance is better.
    </p>
    <p>Again, if you are doing... Ah ok, you got it.</p>
  </UiSection>

  <UiSection id="offline">
    <slot slot="heading">
      Why do I get the message that my browser doesn't support offline
      capability?
    </slot>
    <p>
      To work offline, your browser needs to support Service Worker. The latest
      versions of Chrome, Firefox and Safari should work. So check if you have
      the latest version installed.
    </p>
    <p>
      Please also check if you have <b>enabled cookies</b> in your browser settings.
      If cookies are disabled completly the browser doesn't allow to store any data
      locally. This includes caching the data in a service worker for offline capability.
    </p>
  </UiSection>

  <UiSection id="cache">
    <slot slot="heading">
      Why does application data gets preloaded everytime, aka why does my
      application data not cache?
    </slot>
    <p>
      The application data is stored in the browsers cache storage. If you have
      set your browser to delete all data (cookies and website data) on close,
      the application data will be deleted.
    </p>
  </UiSection>

  <UiSection id="ffmpeg-error">
    <slot slot="heading">I get an error while converting a file.</slot>
    <p>
      Your browser needs to support <b>Shared Array Buffer</b>. Chrome 68+,
      Firefox 79+, Safari 15.2+ and Edge 79+ should work. You can get more
      informations on supported browsers at
      <a href="https://caniuse.com/?search=sharedarraybuffer" target="_blank"
        >caniuse.com</a
      >.
    </p>
    <p>
      You can also check the FFmpeg output in the <b>expert</b> console.
    </p>
  </UiSection>

  <UiSection id="size-limit">
    <slot slot="heading">Why can I only convert files up to 2GB?</slot>
    <p>
      This is a hard limit of the browser when using service workers. This may
      change in the future.
    </p>
  </UiSection>

  <UiSection id="who">
    <slot slot="heading">Who are you and why have you created this?</slot>
    <p>
      I'm a freelance webdevolper with a passion for web apps. I've created this
      as a side project to learn more about progressive web apps. Check out my
      site at <a href="https://thomashurtig.de" target="_blank"
        >thomashurtig.de</a
      >.
    </p>
  </UiSection>
</PageContainer>
