import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the portfolio and approved public claims", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Ab Singh/);
  assert.match(html, /AI systems/);
  assert.match(html, /Founder-led/);
  assert.match(html, /30m\/day/);
  assert.match(html, /hey@theabsingh\.com/);
  assert.doesNotMatch(html, /4 builds|four documented builds/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
  assert.doesNotMatch(html, /Bionny/i);

  const interactiveSources = await Promise.all([
    readFile(new URL("../app/components/DashboardExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SupportOperations.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ContentStudio.tsx", import.meta.url), "utf8"),
  ]).then((sources) => sources.join("\n"));
  assert.match(interactiveSources, /Single-store owner view/);
  assert.match(interactiveSources, /Multi-store consolidated view/);
  assert.match(interactiveSources, /AI Support Agents/);
  assert.match(interactiveSources, /Custom Operations Dashboard/);
  assert.match(interactiveSources, /Content Automation/);
  assert.match(interactiveSources, /3,000\+/);
  assert.match(interactiveSources, /~55%/);
  assert.match(interactiveSources, /All conversations/);
  assert.match(interactiveSources, /Support enquiries/);
  assert.match(interactiveSources, /Continue as the customer/);
  assert.doesNotMatch(interactiveSources, /Growth team|Ad Team Dashboard/i);
});

test("renders each immersive system demo", async () => {
  for (const [path, expected] of [
    ["/demos/support", "Interactive support environment"],
    ["/demos/dashboard", "Live data model"],
    ["/demos/content", "Content workspace"],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(expected));
  }
});
