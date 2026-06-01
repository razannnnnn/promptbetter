# PromptBetter ✨
> Transform your rough, vague prompts into clear, structured, and effective AI prompts in seconds.

![image](https://hostimgajaa.razan.web.id/api/i/5e98d422-2c8b-431a-a5ee-4013c98c6a04.png)

## 🚀 Live Demo

[promptbetter.vercel.app](https://promptbetter.vercel.app)

## 🛠️ Tech Stack

- **Framework** – [Next.js](https://nextjs.org/) 16 (App Router)
- **Auth** – [Clerk](https://clerk.com/) (OAuth GitHub/Google, email + verification)
- **Styling** – [Tailwind CSS](https://tailwindcss.com/) 4
- **AI** – LLaMA 3.3 70B via [Groq API](https://console.groq.com/)
- **Database** – MongoDB (daily rate limits)
- **Deployment** – [Vercel](https://vercel.com/)

## ✨ Features

- 🤖 AI-powered prompt improvement (Groq / LLaMA 3.3 70B)
- 🔐 Sign in with GitHub, Google, or email (with email verification)
- 👤 User profile at `/profile`
- 📋 One-click copy improved prompt
- 🛡️ Daily rate limits: 5/day guest, 10/day signed-in
- 📱 Responsive glassmorphism UI

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- [Clerk](https://dashboard.clerk.com) application (enable Email, GitHub, Google)
- Groq API key → [console.groq.com](https://console.groq.com/)
- MongoDB URI for rate limiting

### Installation

1. Clone and install

```bash
git clone https://github.com/razannnnnn/promptbetter.git
cd promptbetter
npm install
```

2. Copy `.env.example` to `.env.local` and fill in values (see [Clerk Dashboard](https://dashboard.clerk.com) for keys)

3. In Clerk Dashboard → **User & authentication**:
   - Enable **Sign-up with email** and **Verify at sign-up** (email code)
   - Enable **GitHub** and **Google** social connections

4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/
│   ├── api/improvePrompt/route.js
│   ├── sign-in/[[...sign-in]]/page.js
│   ├── sign-up/[[...sign-up]]/page.js
│   ├── profile/[[...profile]]/page.js
│   ├── layout.js
│   └── page.js
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── inputArea.jsx
│   └── Result.jsx
├── lib/
│   ├── clerkAppearance.js
│   ├── rateLimit.js
│   ├── mongodb.js
│   └── systemPrompt.js
└── middleware.js
```

## 🔒 Rate Limiting

- **Guest** (by IP): 5 requests per day
- **Signed in** (Clerk `userId`): 10 requests per day
- **Input**: max 1000 characters per prompt

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

[MIT](LICENSE)

---

Made with ❤️ by [Razan](https://github.com/razannnnnn)
