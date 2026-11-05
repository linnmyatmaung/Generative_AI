import test from "node:test";
import assert from "node:assert/strict";
import { readOpenRouterStream } from "../src/service/readOpenRouterStream.js";

test("reads OpenRouter SSE deltas across arbitrary network chunk boundaries", async () => {
  const events = [
    'data: {"choices":[{"delta":{"content":"Linn"}}]}\n\n',
    'data: {"choices":[{"delta":{"content":" has built projects."}}]}\n\n',
    "data: [DONE]\n\n",
  ].join("");
  const bytes = new TextEncoder().encode(events);
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(bytes.slice(0, 17));
      controller.enqueue(bytes.slice(17, 51));
      controller.enqueue(bytes.slice(51));
      controller.close();
    },
  });

  const chunks = [];
  for await (const chunk of readOpenRouterStream(body)) chunks.push(chunk);

  assert.deepEqual(chunks, ["Linn", " has built projects."]);
});

test("surfaces provider errors embedded in an SSE event", async () => {
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('data: {"error":{"message":"Unavailable"}}\n\n'));
      controller.close();
    },
  });

  await assert.rejects(async () => {
    for await (const chunk of readOpenRouterStream(body)) assert.equal(typeof chunk, "string");
  }, /Unavailable/);
});