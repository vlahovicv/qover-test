import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // Global setup file path
  globalSetup: require.resolve("./global-setup"),

  // Look for test files in the "tests" directory, relative to this configuration file
  testDir: "tests",

  // Each test is given 30 seconds
  timeout: 0,

  // Forbid test.only on CI
  forbidOnly: !!process.env.CI,

  // Two retries for each test
  retries: process.env.CI ? 2 : 0,

  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 1 : undefined,

  reporter: "line",

  use: {
    // Browser options
    slowMo: 1000,

    // Context options
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Artifacts
    screenshot: "only-on-failure",
    video: "retry-with-video",
  },
};

export default config;
