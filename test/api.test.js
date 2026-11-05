import test from "node:test";
import assert from "node:assert/strict";

const baseUrl =
  process.env.API_BASE_URL || "https://generative-ai-chatbot-v8pg.onrender.com";

test("GET /health reports the service is running", async () => {
  const response = await fetch(new URL("/health", baseUrl), {
    signal: AbortSignal.timeout(120_000),
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("POST /chat streams a non-empty plain-text reply", async () => {
  const response = await fetch(new URL("/chat", baseUrl), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Reply briefly with a greeting." }),
    signal: AbortSignal.timeout(120_000),
  });

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/plain; charset=utf-8$/);
  const reply = await response.text();
  assert.ok(reply.trim().length > 0);
  assert.equal(reply.startsWith("{"), false);
});
