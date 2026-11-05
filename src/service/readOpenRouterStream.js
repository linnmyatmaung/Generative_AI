async function* eventContents(event) {
  const data = event
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).replace(/^ /, ""))
    .join("\n");

  if (!data || data === "[DONE]") return;

  const payload = JSON.parse(data);
  if (payload.error) {
    throw new Error(payload.error.message || "OpenRouter stream failed");
  }

  const content = payload.choices?.[0]?.delta?.content;
  if (typeof content === "string") yield content;
}

export async function* readOpenRouterStream(body) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });

      let separator;
      while ((separator = buffer.match(/\r?\n\r?\n/))) {
        const event = buffer.slice(0, separator.index);
        buffer = buffer.slice(separator.index + separator[0].length);
        yield* eventContents(event);
      }

      if (done) break;
    }

    if (buffer) yield* eventContents(buffer);
  } finally {
    reader.releaseLock();
  }
}