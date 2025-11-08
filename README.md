# DevFlow AI

DevFlow AI is a Next.js application built to supercharge developer workflows with a suite of AI-powered tools. It automates and assists with common, repetitive tasks, allowing developers to focus on what matters most: building great software.

This project was created for a hackathon to demonstrate the power of generative AI in practical, developer-focused applications.

![DevFlow AI Dashboard](https://i.imgur.com/your-screenshot-url.png) <!-- It's a good idea to replace this with an actual screenshot of your app's dashboard -->

## Features

DevFlow AI currently includes the following tools:

*   **🤖 AI Summary Tool**: Paste in a series of Git commit messages, pull request descriptions, or daily stand-up notes to get a concise, easy-to-read summary.
*   **✅ Meeting Parser**: Automatically extracts action items and key decisions from meeting transcripts. Just paste the text, and the AI will identify the tasks.
*   **✨ Code Snippet Generator**: Describe the code you need in plain English (e.g., "a Python script to resize all JPGs in a directory"), and the AI will generate the snippet for you.
*   **🔍 AI Code Reviewer**: Get an instant, AI-powered review for your code changes. Paste in a `git diff`, and the AI will analyze it for potential bugs, performance improvements, and adherence to best practices.

## Tech Stack

This project is built with a modern, robust, and scalable tech stack:

*   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **AI/Generative**: [Google's Genkit](https://firebase.google.com/docs/genkit)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/en) (v20 or later recommended)
*   `npm` or your favorite package manager
*   A Google AI API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of the project by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
    Open `.env.local` and add your Google AI API Key:
    ```env
    GEMINI_API_KEY="YOUR_GOOGLE_AI_API_KEY"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running at [http://localhost:9002](http://localhost:9002).

## Deployment

This application is designed for easy deployment on modern hosting platforms that support Next.js.

### Deploying to Firebase App Hosting

This project is already configured for zero-config deployment to [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

1.  **Install Firebase CLI:**
    If you don't have it, install the Firebase CLI globally:
    ```bash
    npm install -g firebase-tools
    ```

2.  **Initialize Firebase in your project:**
    Run the following command and follow the prompts. Select "App Hosting" when asked which Firebase features you want to set up.
    ```bash
    firebase init
    ```

3.  **Deploy your application:**
    After a successful initialization, deploy your application with:
    ```bash
    firebase deploy
    ```
    The CLI will provide you with the URL of your live application.

### Other Platforms (Vercel, Netlify)

You can also deploy this project to other platforms like Vercel or Netlify.

1.  Push your code to a Git repository (e.g., on GitHub).
2.  Import the repository into your Vercel or Netlify account.
3.  Set the `GEMINI_API_KEY` environment variable in the project settings on the platform.
4.  The platform will automatically build and deploy your application.
