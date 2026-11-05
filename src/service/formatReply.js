const normalizeReply = (reply) =>
  reply
    .replace(/\*\*/g, "")
    .replace(/[ \t]*[—–][ \t]*/g, ", ")
    .replace(/(?<=\s)-(?=\s)/g, ",")
    .replace(/ +,/g, ",")
    .replace(/,\s*,+/g, ",")
    .replace(/ {2,}/g, " ");

export const formatReply = (reply) => normalizeReply(reply).trim();

export const createReplyFormatter = () => {
  let pending = "";
  let hasOutput = false;

  return {
    push(chunk) {
      pending += chunk;
      let safeEnd = pending.length;
      while (safeEnd > 0 && /[\s*—–,-]/.test(pending[safeEnd - 1])) {
        safeEnd -= 1;
      }
      if (safeEnd === 0) return "";

      const formatted = normalizeReply(pending.slice(0, safeEnd));
      pending = pending.slice(safeEnd);
      if (!hasOutput) {
        hasOutput = true;
        return formatted.trimStart();
      }
      return formatted;
    },
    finish() {
      const formatted = normalizeReply(pending);
      pending = "";
      return hasOutput ? formatted.trimEnd() : formatted.trim();
    },
  };
};
