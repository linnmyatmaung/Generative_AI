<!-- 🔧 -->

# Azure OpenAI Chat Bot API (Backend)

This is the backend API for the Mindy Wunna chat bot. It uses Azure OpenAI services to process user input and return AI-generated responses. The API is built with Express.js, uses serverless-http for deployment on AWS Lambda, and integrates securely with the Azure OpenAI SDK.

<!-- 🚀 -->
![](https://web-api.textin.com/ocr_image/external/5babc9c0889300d2.jpg)

# Tech Stack

Azure OpenAI SDK – Access GPT models hosted on Azure.

Express.js – Web framework for defining API routes.

Serverless HTTP – Enables running Express apps on AWS Lambda.

<!-- 📝 -->
![](https://web-api.textin.com/ocr_image/external/be2749bf6bf60acf.jpg)

#  Setup Instructions

# 1. Register for Azure OpenAI API

Sign up for access and get your API key and endpoint:

 https://ai.azure.com/?tid=3b2b947c-fc02-41b0-9230-9b5a3d92e761

<!-- 🔗 -->
![](https://web-api.textin.com/ocr_image/external/0c42cc3771c42c42.jpg)

# 2. Add Environment Variables

Create a .env file in the root of the backend folder and add:

<!-- .env  -->
![](https://web-api.textin.com/ocr_image/external/4e099781b10d3de7.jpg)

AZURE_OPENAI_ENDPOINT=&lt;Your Azure OpenAI Endpoint&gt;

AZURE_OPENAI_API_KEY=&lt;Your Azure API Key&gt;

OPENAI_API_VERSION=&lt;Your API Version&gt;  # e.g., 2023-03-15-previe

w

AZURE_OPENAI_DEPLOYMENT_NAME=&lt;Your Model Name&gt;

<!-- 📁 -->
![](https://web-api.textin.com/ocr_image/external/d891218337f705f3.jpg)

## Folder Structure

<!-- Untitled 1 -->

<!-- /backend │ ├── index.js # Entry point (must be in root for Lambda deployment) │ └── src  ├── config # Configuration utilities  ├── constant  │ └── data.js # Static data/constants  ├── controllers # Request handlers  ├── routes # Express route definitions  └── service # Azure/OpenAI service functions 💡 Features 🤖 Handles chat prompts and returns responses using Azure OpenAI. 🔐 Environment-secured API credentials. ⚡ Optimized for serverless deployment (AWS Lambda ready). 📦 Deployment Notes Ensure index.js remains in the root directory for AWS Lambda compatibility. -->
![](https://web-api.textin.com/ocr_image/external/20b7909f054fd45f.jpg)

<!-- Untitled 2 -->

