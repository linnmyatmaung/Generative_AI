# OpenRouter Chat API

Minimal Express API that forwards a message to OpenRouter and returns its reply.

## Run locally

Requires Node.js 20 or newer.

```sh
npm ci
npm start
```

Copy `.env.example` to `.env` and add your OpenRouter key:

```sh
copy .env.example .env
```

The server listens on `PORT` (default `8000`). Send a request to `POST /chat`:

```json
{ "message": "Hello!" }
```

The response contains the model reply:

```json
{ "reply": "Hello! How can I help?" }
```

`GET /health` returns the service status.

## Deploy to Render

1. Push this repository to GitHub.
2. In Render, choose **New +** → **Blueprint** and select the repository.
3. Set `OPENROUTER_API_KEY` in the service's environment settings. The model is
   set by `render.yaml` and can be changed there or in the Render dashboard.
4. Deploy. Render uses the included `render.yaml` to install dependencies,
   start the Node service, and check `GET /health`.

Never commit API keys. `.env` is ignored by Git.
