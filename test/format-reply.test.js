import test from "node:test";
import assert from "node:assert/strict";
import { formatReply } from "../src/service/formatReply.js";

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
