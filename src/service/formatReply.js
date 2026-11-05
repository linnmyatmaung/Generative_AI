export const formatReply = (reply) =>
  reply
    .replace(/\*\*/g, "")
    .replace(/[ \t]*[—–][ \t]*/g, ", ")
    .replace(/(?<=\s)-(?=\s)/g, ",")
    .replace(/ +,/g, ",")
    .replace(/,\s*,+/g, ",")
    .replace(/ {2,}/g, " ")
    .trim();
