# Groq AI Chat Bot API (Backend)

This is the backend API for my porforlio chat bot. The idea was conceptualized by Wunna Aung and implemented by Linn Myat Maung. Unlike the original implementation using Azure OpenAI, this project leverages **Groq AI** to process user input and return AI-generated responses. The API is built with Express.js and deployed on **Render** using a Dockerfile.

# Tech Stack

- **Groq AI SDK** – Access GPT models hosted on Groq AI.
- **Express.js** – Web framework for defining API routes.
- **Docker** – Containerization for deployment.
- **Render** – Cloud platform for hosting the application.

# Setup Instructions

## 1. Register for Groq AI API

Sign up for access and get your API key and endpoint:

[https://groq.ai/signup](https://groq.ai/signup)

## 2. Add Environment Variables

Create a `.env` file in the root of the backend folder and add:

```plaintext
GROQ_API_KEY=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
ENV = local
PORT=3000

Folder Structure
/Generative_AI
│
├── Dockerfile       # Docker configuration for deployment
├──          # Entry point (must be in root for deployment)
└── src
    ├── config       # Configuration utilities
    ├── constant
    │   └── data.js  # Static data/constants
    ├── controllers  # Request handlers
    ├── routes       # Express route definitions
    └── service      # Groq AI service functions
Features
🤖 Handles chat prompts and returns responses using Groq AI.
🔐 Environment-secured API credentials.
⚡ Optimized for containerized deployment on Render.
📦 Deployment-ready with Docker.
Deployment Notes
Ensure index.js remains in the root directory for compatibility with Docker and Render.
Verify that your .env file contains the correct credentials before deployment.
```
