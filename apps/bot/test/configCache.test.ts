import { beforeEach, describe, expect, it, vi } from "vitest";

import { getGuildConfig, invalidateGuildConfig } from "~/services/settings";

const { getByGuild, globalGet } = vi.hoisted(() => ({
  getByGuild: vi.fn(),
  globalGet: vi.fn(),
}));

vi.mock("@bl/db", () => ({
  db: {
    settings: { getByGuild },
    globalSettings: { get: globalGet },
  },
}));

// The cache module imports these at load time but only uses them in the
// subscriber, which these tests don't start.
vi.mock("@bl/redis", () => ({
  redis: { duplicate: vi.fn() },
  CONFIG_INVALIDATION_CHANNEL: "config:invalidate",
}));

beforeEach(() => {
  vi.resetAllMocks();
  globalGet.mockResolvedValue(null);
});

// Each test uses a distinct guild id — the cache is module-level state.
describe("configCache", () => {
  it("dedupes concurrent loads for the same guild into one query", async () => {
    getByGuild.mockResolvedValue([]);
    await Promise.all([
      getGuildConfig("dedupe"),
      getGuildConfig("dedupe"),
      getGuildConfig("dedupe"),
    ]);
    expect(getByGuild).toHaveBeenCalledTimes(1);
  });

  it("serves a cached entry without re-querying", async () => {
    getByGuild.mockResolvedValue([]);
    await getGuildConfig("cache-hit");
    await getGuildConfig("cache-hit");
    expect(getByGuild).toHaveBeenCalledTimes(1);
  });

  it("reloads after an invalidation", async () => {
    getByGuild.mockResolvedValue([]);
    await getGuildConfig("reload");
    invalidateGuildConfig("reload");
    await getGuildConfig("reload");
    expect(getByGuild).toHaveBeenCalledTimes(2);
  });

  it("does not cache a load that an invalidation raced", async () => {
    let resolveLoad!: (rows: unknown[]) => void;
    getByGuild.mockImplementationOnce(
      () => new Promise((resolve) => (resolveLoad = resolve)),
    );

    const pending = getGuildConfig("race"); // starts load, captures generation
    invalidateGuildConfig("race"); // bumps generation mid-load
    resolveLoad([]); // the in-flight load resolves with the pre-write snapshot
    await pending;

    // Because the load was raced, it must not have been cached — the next read
    // reloads and sees the post-write data.
    getByGuild.mockResolvedValueOnce([{ channelId: "cZ" }]);
    const after = await getGuildConfig("race");

    expect(getByGuild).toHaveBeenCalledTimes(2);
    expect(after.settings).toEqual([{ channelId: "cZ" }]);
  });
});
