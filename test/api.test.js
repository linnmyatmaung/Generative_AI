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

test("POST /chat returns a non-empty reply", async () => {
  const response = await fetch(new URL("/chat", baseUrl), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Reply briefly with a greeting." }),
    signal: AbortSignal.timeout(120_000),
  });

  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(typeof result.reply, "string");
  assert.ok(result.reply.trim().length > 0);
});
