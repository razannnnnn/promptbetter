# PromptBetter ✨

Transform your rough, vague prompts into clear, structured, and effective AI prompts in seconds.

## 🚀 Live Demo

[promptbetter.vercel.app](https://promptbetter.vercel.app) <!-- ganti dengan URL asli kamu -->

## 📸 Preview

<!-- tambahkan screenshot di sini -->

## 🛠️ Tech Stack

- **Framework** – [Next.js](https://nextjs.org/) (App Router)
- **Styling** – [Tailwind CSS](https://tailwindcss.com/)
- **AI Model** – LLaMA 3.3 70B via [Groq API](https://console.groq.com/)
- **Deployment** – [Vercel](https://vercel.com/)

## ✨ Features

- 🤖 AI-powered prompt improvement using LLaMA 3.3 70B
- ⚡ Fast response powered by Groq inference
- 📋 One-click copy improved prompt
- 🔢 Character counter on input
- ⏱️ Cooldown timer to prevent spam
- 🛡️ Rate limiting on backend per IP
- 📱 Responsive design

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- Groq API Key → [console.groq.com](https://console.groq.com/)

### Installation

1. Clone the repository

```bash
git clone https://github.com/razannnnnn/promptbetter.git
cd promptbetter
```

2. Install dependencies

```bash
npm install
```

3. Create `.env.local` and add your Groq API key

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── improvePrompt/
│   │       └── route.js       # Groq API handler
│   └── page.js                # Root page
├── components/
│   ├── Hero.jsx               # Main section (holds state)
│   ├── InputArea.jsx          # Textarea & submit button
│   └── Result.jsx             # Display improved prompt
└── lib/
    └── systemPrompt.js        # AI system prompt
```

## 🔒 Rate Limiting

- **Frontend** – 10 second cooldown after each request
- **Backend** – 15 second cooldown per IP address
- **Input** – Maximum 500 characters per prompt

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

[MIT](LICENSE)

---

Made with ❤️ by [Razan](https://github.com/razannnnnn)
