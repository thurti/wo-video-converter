import "@testing-library/jest-dom";
import { render, cleanup, screen } from "@testing-library/svelte";
import { html } from "@playpilot/svelte-htm";
import Settings from "@/components/Settings.svelte";
import userEvent from "@testing-library/user-event";
import { get, writable } from "svelte/store";

const formats = {
  id: "format",
  label: "Format",
  value: "format",
  options: [
    { id: "mp4", label: "mp4", value: "mp4", mimetype: "video/mp4" },
    { id: "mov", label: "mov", value: "mov", mimetype: "video/quicktime" },
  ],
};

const settings = {
  mp4: [
    {
      id: "bitrate",
      label: "Bitrate",
      value: "bitrate",
      options: [
        { id: "mp4-vbr-0", label: "VBR 245 kbit/s", value: "-q:a 0" },
        { id: "mp4-vbr-2", label: "VBR 190 kbit/s", value: "-q:a 2" },
      ],
    },
    {
      id: "sample-rate",
      label: "Sample Rate",
      value: "sample-rate",
      options: [
        { id: "8", label: "8 kHz", value: "-ar 8000" },
        { id: "16", label: "16 kHz", value: "-ar 16000" },
      ],
    },
  ],
};

const defaults = {
  format: {
    id: "mp4",
    label: "mp4",
    value: "mp4",
    mimetype: "video/mp4",
  },
  settings: {
    bitrate: {
      id: "mp4-vbr-0",
      label: "245 kbit/s",
      value: "-q:a 0",
    },
    "sample-rate": { id: "16", label: "16 kHz", value: "-ar 16000" },
  },
};

describe("Settings", () => {
  afterEach(() => cleanup());

  const user = userEvent.setup();

  it("should render correctly", async () => {
    render(
      html`<${Settings}
        formats=${formats}
        settings=${settings}
        defaultSettings=${defaults.settings}
        selectedFormat=${defaults.format}
      />`,
    );
    expect(screen.getByText("Format")).toBeInTheDocument();
    expect(screen.getByLabelText("mov")).toBeInTheDocument();
    expect(screen.getByLabelText("mp4")).toBeInTheDocument();

    await user.click(screen.getByText("Bitrate"));

    expect(screen.getByText("Bitrate")).toBeInTheDocument();
    expect(screen.getByLabelText("VBR 245 kbit/s")).toBeInTheDocument();
    expect(screen.getByLabelText("VBR 190 kbit/s")).toBeInTheDocument();
    expect(screen.getByLabelText("VBR 245 kbit/s")).toBeChecked();
  });

  it("should update selectedFormat", async () => {
    const selectedFormat = writable({});

    render(
      html`<${Settings}
        formats=${formats}
        settings=${settings}
        defaultSettings=${defaults.settings}
        bind:selectedFormat=${selectedFormat}
      />`,
    );

    expect(screen.getByLabelText("mp4")).not.toBeChecked();
    await user.click(screen.getByLabelText("mp4"));

    expect(screen.getByLabelText("mp4")).toBeChecked();
    expect(get(selectedFormat)).toEqual({
      id: "mp4",
      label: "mp4",
      value: "mp4",
      mimetype: "video/mp4",
    });
  });

  it("should update selectedSettings", async () => {
    const selectedSettings = writable({});

    render(
      html`<${Settings}
        formats=${formats}
        settings=${settings}
        defaultSettings=${defaults.settings}
        bind:selectedSettings=${selectedSettings}
      />`,
    );

    await user.click(screen.getByLabelText("mp4"));
    await user.click(screen.getByText("Bitrate"));
    await user.click(screen.getByLabelText("VBR 190 kbit/s"));

    expect(get(selectedSettings)).toEqual({
      bitrate: { id: "mp4-vbr-2", label: "VBR 190 kbit/s", value: "-q:a 2" },
      "sample-rate": { id: "16", label: "16 kHz", value: "-ar 16000" },
    });
  });
});
