# GEMINI.md - PromptBetter Project Context

## Project Overview
**PromptBetter** is a modern Next.js 16 (App Router) web application designed to transform rough, vague user prompts into clear, structured, and highly effective AI prompts. It utilizes the **LLaMA 3.3 70B** model via the **Groq API** for high-performance inference.

### Core Tech Stack
- **Framework**: Next.js 16.2.2 (App Router)
- **Library**: React 19.2.4
- **Styling**: Tailwind CSS 4.0.0+ (using `@tailwindcss/postcss`)
- **AI Engine**: Groq SDK (`llama-3.3-70b-versatile`)
- **Database**: MongoDB with Mongoose (for rate limiting and potentially user data)
- **Authentication**: Next-Auth 4.24.13
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React

## Project Structure
```text
src/
├── app/
│   ├── api/
│   │   ├── auth/           # Next-Auth configuration
│   │   └── improvePrompt/  # AI prompt improvement endpoint
│   ├── layout.js           # Root layout with providers
│   └── page.js             # Main landing page
├── components/
│   ├── Header.jsx          # Navigation and branding
│   ├── Hero.jsx            # Main stateful container
│   ├── inputArea.jsx       # User input handling
│   ├── Result.jsx          # AI output display (Markdown support)
│   └── SessionWrapper.jsx  # Auth provider wrapper
└── lib/
    ├── mongodb.js          # Database connection utility
    ├── rateLimit.js        # IP & User-based rate limiting logic
    └── systemPrompt.js     # Core AI expert persona instructions
```

## Building and Running

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- Groq API Key

### Commands
- **Install Dependencies**: `npm install`
- **Development**: `npm run dev` (runs at [http://localhost:3000](http://localhost:3000))
- **Build**: `npm run build`
- **Start Production**: `npm run start`
- **Linting**: `npm run lint`

### Environment Variables (.env.local)
```env
GROQ_API_KEY=your_groq_api_key
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_next_auth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Development Conventions

### AI Interaction Pattern
The project uses a specialized `systemPrompt.js` that enforces:
- Outputting **ONLY** the improved prompt (no preamble/explanation).
- Forcing English output regardless of input language.
- Incorporating **Role**, **Context**, **Task**, and **Format** into the result.

### Rate Limiting Logic
- **Guests**: 5 requests per day (tracked by IP).
- **Logged-in Users**: 10 requests per day (tracked by User ID).
- Frontend implements a 10-second cooldown timer between requests.

### Styling & UI
- Uses **Tailwind CSS 4** with a focus on glassmorphism effects (`backdrop-blur`, `bg-white/5`).
- Custom brand color: `text-brand` (Emerald/Neon Green).
- Icons: Always use `lucide-react`.

### Database
- Connections are cached to prevent multiple instances during Next.js hot reloads (see `src/lib/mongodb.js`).
- Rate limits are stored in the `RateLimit` collection with unique indexes on `identifier` and `date`.

## Key Files for Reference
- `src/lib/systemPrompt.js`: Change this to adjust how the AI rewrites prompts.
- `src/app/api/improvePrompt/route.js`: Main backend logic for AI calls and rate limit checks.
- `src/components/Hero.jsx`: Orchestrates the flow between input and result.
- `package.json`: Contains the latest dependency versions (React 19, Tailwind 4).
