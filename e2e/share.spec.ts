import { test, expect } from "@playwright/test";

test.describe("Share Settings", () => {
  test("display share settings modal", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.waitForSelector(".container", { strict: false });
    await page.getByRole("button", { name: "Share" }).click();

    await expect(
      page.getByRole("heading", { name: "Share Settings" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Close" }).click();
    await expect(
      page.getByRole("heading", { name: "Share Settings" }),
    ).not.toBeVisible();
  });

  test("copy settings url to clipboard", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.waitForSelector(".container", { strict: false });

    // select some settings
    await page.getByLabel("GIF").click();
    await page.getByLabel("20", { exact: true }).click();

    await page.getByRole("tab", { name: "Width" }).click();
    await page.getByLabel("80px", { exact: true }).click();

    await page.getByRole("tab", { name: "Loop" }).click();
    await page.getByLabel("no loop", { exact: true }).click();

    await page.getByRole("button", { name: "Share" }).click();
    await page.getByRole("button", { name: "Copy" }).click();
    await expect(page.locator("text=Copied to clipboard")).toBeVisible();

    let clipboardText = await page.evaluate("navigator.clipboard.readText()");
    await page.getByRole("button", { name: "Copy" }).click();

    // expected settings
    const format = {
      id: "gif",
      label: "GIF",
      value: "GIF",
      ext: "gif",
      mimetype: "image/gif",
    };

    const settings = {
      "gif-fps": { id: "gif-fps-20", label: "20", value: "-r 20" },
      "gif-scale": {
        id: "gif-scale-80",
        label: "80px",
        value: "-vf scale=80:-1",
      },
      "gif-loop": { id: "gif-loop-0", label: "no loop", value: "-loop -1" },
    };

    expect(clipboardText).toBe(mockSettingsUrl(format, settings));
  });

  test("open url with shared settings selects the settings", async ({
    page,
  }) => {
    const format = {
      id: "webm",
      label: "WEBM",
      value: "WEBM",
      ext: "webm",
      mimetype: "video/webm",
    };

    const settings = {
      "webm-vcodec": {
        id: "webm-vcodec-vp8",
        label: "VP8",
        value: "-vcodec libvpx",
      },
      "webm-quality": {
        id: "webm-quality-lossless",
        label: "Lossless",
        value: "-crf 4",
      },
      "webm-acodec": {
        id: "webm-acodec-vorbis",
        label: "Vorbis",
        value: "-c:a libvorbis",
      },
    };

    const url = mockSettingsUrl(format, settings);
    await page.goto(url);

    await expect(page.getByLabel("WEBM")).toBeChecked();

    await page.getByRole("tab", { name: "Video Codec" }).click();
    await expect(page.getByRole("radio", { name: "VP8" })).toBeChecked();

    await page.getByRole("tab", { name: "Audio Codec" }).click();
    await expect(page.getByLabel("Vorbis", { exact: true })).toBeChecked();

    await page.getByRole("tab", { name: "Quality" }).click();
    await expect(page.getByLabel("Lossless", { exact: true })).toBeChecked();
  });

  test('open url with shared settings selects the settings and "Custom" format', async ({
    page,
  }) => {
    const format = {
      id: "webm",
      label: "WEBM",
      value: "WEBM",
      ext: "webm",
      mimetype: "video/webm",
    };

    const settings = {
      custom: {
        id: "custom",
        label: "Custom",
        value: "my super custom settings",
      },
    };

    const url = mockSettingsUrl(format, settings);
    await page.goto(url);

    await expect(page.getByLabel("WEBM")).toBeChecked();
    await expect(page.getByText("Custom Command is in use.")).toBeVisible();

    // open advanced settings
    await page.getByRole("heading", { name: "Expert Stuff" }).click();
    await expect(page.getByLabel("Enable Custom Command")).toBeChecked();
    await expect(
      page.getByLabel("Custom Command", { exact: true }),
    ).toHaveValue("my super custom settings");
  });

  test('opens settgings url with "Custom" format and settings', async ({
    page,
  }) => {
    const format = {
      id: "custom",
      label: "Super Custom",
      ext: "custom",
      value: "my super custom format",
      settings: {
        presetSettings: {
          id: "presetSetting",
          label: "Custom",
          value: "my super custom settings",
        },
      },
      isCustomPreset: true,
    };

    const url = mockSettingsUrl(format, {});
    await page.goto(url);

    await expect(page.getByLabel("Super Custom")).toBeChecked();
    await expect(page.getByText("my super custom settings")).toBeVisible();

    await page.evaluate(() =>
      window.localStorage.removeItem("wo-audio-converter-customPresets"),
    );
  });
});

function mockSettingsUrl(format, settings) {
  const url = new URL("http://localhost:5173");
  url.searchParams.set("format", JSON.stringify(format));
  url.searchParams.set("settings", JSON.stringify(settings));
  return url.toString();
}
