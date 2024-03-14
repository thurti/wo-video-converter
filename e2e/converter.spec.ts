import { test, expect } from "@playwright/test";
import path from "path";

const __dirname = path.resolve() + "/e2e";
const __tempDir = path.resolve() + "/e2e/temp";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".container", { strict: false });

  await page
    .getByLabel("Add Video Files")
    .setInputFiles(path.join(__dirname, "test.webm"));

  await page
    .getByLabel("Add Video Files")
    .setInputFiles(path.join(__dirname, "test-2.avi"));
});

test.describe("Load/Remove File(s)", () => {
  test("convert button is enabled", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Convert All" }),
    ).toBeEnabled();
  });

  test("display file names in list", async ({ page }) => {
    await expect(page.getByText("test.webm")).toBeVisible();
    await expect(
      page.getByRole("main").filter({ hasText: "Video File Converter" }),
    ).toContainText("test-2.avi");
  });

  test("removes single file", async ({ page }) => {
    await page.getByTitle("Remove file test.webm").click();
    await expect(
      page.getByRole("main").filter({ hasText: "Video File Converter" }),
    ).not.toContainText("test.webm");
  });

  test("removes all files", async ({ page }) => {
    await page.getByTitle("Remove All").click();
    await expect(
      page.getByRole("main").filter({ hasText: "Video File Converter" }),
    ).not.toContainText("test.webm");
    await expect(
      page.getByRole("main").filter({ hasText: "Video File Converter" }),
    ).not.toContainText("test-2.avi");
    await expect(
      page.getByRole("button", { name: "Convert All" }),
    ).toBeDisabled();
  });
});

test.describe("Convert", () => {
  test("converts files with default settings", async ({ page }) => {
    await page.getByLabel("gif").click();
    await page.getByRole("button", { name: "Convert All" }).click();

    await expect(page.getByTitle("Save test.gif as")).toBeVisible({
      timeout: 420000,
    });
    await expect(page.getByTitle("Save test-2.gif as")).toBeVisible({
      timeout: 420000,
    });

    await expect(
      page.getByRole("button", { name: "Download All" }),
    ).toBeVisible();
  });

  test("show summary of selected format and settings", async ({ page }) => {
    await page.getByLabel("gif").click();
    await expect(page.getByLabel("gif")).toBeChecked();

    await page.getByRole("tab", { name: "Frames/sec" }).click();
    await page.getByLabel("15", { exact: true }).click();

    await page.getByRole("tab", { name: "Width" }).click();
    await page.getByLabel("80px", { exact: true }).click();

    await page.getByRole("tab", { name: "Loop" }).click();
    await page.getByLabel("no loop", { exact: true }).click();

    await expect(
      page.getByText("15 | 80px | no loop", { exact: true }),
    ).toBeVisible();
  });

  test("converts files with custom command", async ({ page }) => {
    await page.getByLabel("gif").click();

    await page.getByRole("heading", { name: "Expert Stuff" }).click();
    await page.getByLabel("Enable Custom Command").click();
    await page.getByLabel("Custom Command", { exact: true }).fill("-an");

    await page.getByRole("button", { name: "Convert All" }).click();

    await expect(page.getByTitle("Save test.gif as")).toBeVisible({
      timeout: 420000,
    });
    await expect(page.getByTitle("Save test-2.gif as")).toBeVisible({
      timeout: 420000,
    });
  });

  test("shows ffmpeg error on invalid file", async ({ page }) => {
    await page.getByTitle("Remove All").click();
    await page
      .getByLabel("Add Video Files")
      .setInputFiles(path.join(__dirname, "test-error.mp3"));

    await page.getByRole("button", { name: "Convert All" }).click();
    await expect(page.getByText("There was an FFMPEG error")).toBeVisible({
      timeout: 420000,
    });
  });

  test("show error on invalid custom command", async ({ page }) => {
    await page.getByRole("heading", { name: "Expert Stuff" }).click();
    await page.getByLabel("Enable Custom Command").click();
    await page.getByLabel("Custom Command", { exact: true }).fill("wtf");

    await page.getByRole("button", { name: "Convert All" }).click();
    await expect(page.locator(".ffmpeg-error")).toHaveCount(2, {
      timeout: 420000,
    });
    await expect(
      page.getByText("There was an FFMPEG error").first(),
    ).toBeVisible();
  });
});
