## Production URL

```text
https://generative-ai-chatbot-v8pg.onrender.com
```

## Request

`POST https://generative-ai-chatbot-v8pg.onrender.com/chat`

```json
{
  "message": "Hello!"
}
```

## Response

The server responds with `200 OK` and `Content-Type: text/plain; charset=utf-8`. The body is streamed as text chunks as the model generates its reply. Chunks may split in the middle of a word; concatenate them to get the complete plain-text response.

```text
Hello! How can I help?
```

## Browser client

Read the response body as a stream instead of calling `response.json()`:

```js
const response = await fetch("https://generative-ai-chatbot-v8pg.onrender.com/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Hello!" }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();
while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  appendToReply(decoder.decode(value, { stream: true }));
}
```
