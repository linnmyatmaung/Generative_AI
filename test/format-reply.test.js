import test from "node:test";
import assert from "node:assert/strict";
import { createReplyFormatter, formatReply } from "../src/service/formatReply.js";

test("removes bold markers and replaces dash punctuation", () => {
  assert.equal(
    formatReply("I am **Linn** — a developer - and a problem-solver."),
    "I am Linn, a developer, and a problem-solver.",
  );
});

test("preserves ordinary hyphenated words", () => {
  assert.equal(
    formatReply("I build full-stack applications and work hard."),
    "I build full-stack applications and work hard.",
  );
});

test("formats streamed chunks consistently across split punctuation", () => {
  const formatter = createReplyFormatter();
  const chunks = ["I am **Linn** ", "— a developer ", "- and a full-", "stack engineer."];
  const streamed = chunks.map((chunk) => formatter.push(chunk)).join("") + formatter.finish();

  assert.equal(streamed, formatReply(chunks.join("")));
});
