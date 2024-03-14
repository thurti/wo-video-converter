import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".container", { strict: false });
});

test.describe("Basic App", () => {
  test("displays title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Video\nFile Converter" }).first(),
    ).toBeVisible();
  });

  test("displays file input", async ({ page }) => {
    await expect(page.getByLabel("Add Video Files")).toBeAttached();
    await expect(page.getByText("Please add some files.")).toBeVisible();
  });

  test("displays formats from config", async ({ page }) => {
    await expect(page.getByLabel("mp4")).toBeVisible();
    await expect(page.getByLabel("webm")).toBeVisible();
    await expect(page.getByLabel("ogv")).toBeVisible();
    await expect(page.getByLabel("gif")).toBeVisible();
  });

  test("displays settings from config", async ({ page }) => {
    // Video Codec
    await page.getByRole("tab", { name: "Video Codec" }).click();
    await expect(page.getByLabel("H.264", { exact: true })).toBeChecked();
    await expect(page.getByLabel("H.265", { exact: true })).toBeVisible();

    // Quality
    await page.getByRole("tab", { name: "Quality" }).click();
    await expect(page.getByLabel("Low", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Medium", { exact: true })).toBeChecked();
    await expect(page.getByLabel("High", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Lossless", { exact: true })).toBeVisible();

    // Audio Codec
    await page.getByRole("tab", { name: "Audio Codec" }).click();
    await expect(page.getByLabel("AAC", { exact: true })).toBeVisible();
    await expect(page.getByLabel("MP3", { exact: true })).toBeChecked();
    await expect(
      page.getByLabel("remove audio", { exact: true }),
    ).toBeVisible();

    // Resolution
    await page.getByRole("tab", { name: "Resolution" }).click();
    await expect(page.getByLabel("as source", { exact: true })).toBeChecked();
    await expect(page.getByLabel("2K", { exact: true })).toBeVisible();
    await expect(
      page.getByLabel("1080p (Full HD)", { exact: true }),
    ).toBeVisible();
    await expect(page.getByLabel("720p (HD)", { exact: true })).toBeVisible();
    await expect(page.getByLabel("480p (SD)", { exact: true })).toBeVisible();
  });

  test("display convert button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Convert All" }),
    ).toBeDisabled();
  });
});

test.describe("Pages", () => {
  test("About page", async ({ page }) => {
    await page.getByRole("link", { name: "About" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/info");
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/");
  });

  test("Preferences page", async ({ page }) => {
    await page.getByRole("link", { name: "Preferences" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/preferences");
    await expect(
      page.getByRole("heading", { name: "Preferences" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/");
  });

  test("Privacy page", async ({ page }) => {
    await page.getByRole("link", { name: "Privacy" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/privacy");
    await expect(page.getByRole("heading", { name: "Privacy" })).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/");
  });

  test("Imprint page", async ({ page }) => {
    await page.getByRole("link", { name: "Imprint" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/imprint");
    await expect(page.getByRole("heading", { name: "Imprint" })).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/");
  });

  test("FAQ page", async ({ page }) => {
    await page.getByRole("link", { name: "FAQ" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/faq");
    await expect(page.getByRole("heading", { name: "FAQ" })).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/");
  });
});
