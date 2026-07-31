import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

const port = 3117;
const origin = `http://127.0.0.1:${port}`;

async function waitForServer(server) {
  const deadline = Date.now() + 20_000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js server exited with code ${server.exitCode}`);
    }

    try {
      const response = await fetch(origin);
      if (response.ok) {
        return response;
      }
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error("Timed out waiting for the Next.js production server");
}

test("native Next.js server renders the Need A Ride arrival experience", async (t) => {
  const server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(port)],
    {
      cwd: new URL("..", import.meta.url),
      env: { ...process.env, NODE_ENV: "production" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  t.after(() => {
    server.kill("SIGTERM");
  });

  const response = await waitForServer(server);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>The Next Chapter of Need A Ride<\/title>/i);
  assert.match(html, /Need A Ride LLC/);
  assert.match(html, /The Next Chapter/);
  assert.match(html, /Enter the Vision/);
  assert.match(html, /Private concept experience/);
  assert.match(html, /Don’t Just Imagine It/);
  assert.match(html, /Experience It/);
  assert.match(html, /Start a Booking/);
  assert.match(html, /Controlled local demo/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
