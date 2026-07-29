import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Need A Ride arrival experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>The Next Chapter of Need A Ride<\/title>/i);
  assert.match(html, /Need A Ride LLC/);
  assert.match(html, /The Next Chapter/);
  assert.match(html, /Enter the Vision/);
  assert.match(html, /Private concept experience/);
  assert.match(html, /Built for the Way/);
  assert.match(html, /Manual communication/);
  assert.match(html, /Connected experience/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
