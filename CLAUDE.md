@AGENTS.md
# PromptBetter - AI Prompt Optimization Platform


## 1. Project Overview
**PromptBetter** is a Next.js-based web application that helps users optimize their AI prompts for better results. The platform features a modern, glassmorphism-based UI with smooth animations and a responsive design. It serves as a frontend for AI prompt engineering, allowing users to input prompts, get optimized versions, and view detailed explanations.

## 2. Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript
- **Auth**: Clerk (`@clerk/nextjs`) — OAuth (GitHub/Google), email sign-up + verification, `/profile`
- **AI**: Groq SDK (`llama-3.3-70b-versatile`)
- **Database**: MongoDB + Mongoose (rate limits)
- **Styling**: Tailwind CSS 4
- **Animation**: `motion` (from `motion/react`)
- **UI**: Glassmorphism (`.glass` in `globals.css`), Lucide icons, Clerk prebuilt components with custom `clerkAppearance.js`

## 3. Project Structure
```
src/
├── app/
│   ├── layout.js              # ClerkProvider + fonts
│   ├── page.js                # Home (Header, Hero, Footer)
│   ├── sign-in/[[...sign-in]]/
│   ├── sign-up/[[...sign-up]]/
│   ├── profile/[[...profile]]/
│   └── api/improvePrompt/route.js
├── components/
│   ├── Header.jsx, Hero.jsx, inputArea.jsx, Result.jsx, Footer.jsx
├── lib/
│   ├── clerkAppearance.js, systemPrompt.js, rateLimit.js, mongodb.js
└── middleware.js              # Public: /, sign-in/up, improvePrompt API
```

## 4. Key Features

### 4.1. User Interface
- **Glassmorphism Design**: Translucent, frosted glass effect for all major UI elements
- **Dark Mode**: Built-in dark theme with high contrast
- **Smooth Animations**: Micro-interactions and page transitions using `motion`
- **Responsive Design**: Mobile-first approach with breakpoints for all devices

### 4.2. Core Functionality
- **Prompt Input**: Textarea (max 1000 chars) in `inputArea.jsx`
- **AI Optimization**: `POST /api/improvePrompt` via Groq
- **Result Display**: `Result.jsx` with copy-to-clipboard
- **Auth**: Clerk — guest 5 req/day (IP), user 10 req/day (`userId`)
- **Profile**: `/profile` with `<UserProfile />`

## 5. API Integration
- **improvePrompt**: Uses `auth()` from `@clerk/nextjs/server` for `userId`; public route (guests allowed)
- **Env**: `GROQ_API_KEY`, `MONGODB_URI`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` (see `.env.example`)


## 6. Animation System
### Motion Components
- **`motion.div`**: For general animations and transitions
- **`AnimatePresence`**: For mounting/unmounting animations

### Key Animations
- **Page Load**: Hero section fades in with a slight upward movement
- **Button Hover**: Subtle glow effect on hover
- **Result Display**: Results slide in smoothly when generated
- **Loading State**: Spinner animation using `rotate`

## 7. Styling System
### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#00FF88',  // Neon green
        background: '#0A0A0A',  // Deep dark background
      },
      glass: {
        DEFAULT: 'rgba(255, 255, 255, 0.05)',
      },
    },
  },
};
```

### CSS Variables
```css
/* src/styles/globals.css */
:root {
  --font-geist-sans: ...;
  --font-geist-mono: ...;
  --color-brand: #00FF88;
  --color-background: #0A0A0A;
}
```

## 8. Development Setup
### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Lint code

## 9. Usage Guide
### Basic Usage
1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Enter a prompt in the input area
3. Click "Optimalkan" button
4. View the optimized prompt and explanation

### Example Workflow
1. **Input**: "Buatkan saya gambar kucing"
2. **Click**: "Optimalkan"
3. **Output**: 
   - **Optimized Prompt**: "Buatkan saya gambar kucing dengan gaya fotorealistik, resolusi 4K, pencahayaan studio, dan detail bulu yang tajam."
   - **Explanation**: "Prompt asli terlalu umum. Penambahan detail spesifik (gaya, resolusi, pencahayaan) akan meningkatkan kualitas hasil AI."

## 10. Future Enhancements
- [ ] Implement actual API integration with backend
- [ ] User authentication system
- [ ] Prompt history database
- [ ] Prompt templates for different use cases
- [ ] Real-time collaboration features
- [ ] Mobile app version

## 11. Troubleshooting
### Common Issues
1. **Animation not working**:
   - Ensure `motion` is installed: `npm install motion`
   - Check that `motion/react` is imported correctly

2. **Tailwind styles not applying**:
   - Verify Tailwind is configured in `tailwind.config.js`
   - Check that `globals.css` is imported in `layout.js`

3. **API calls failing**:
   - Check browser console for CORS errors
   - Verify backend API is running and accessible

## 12. License
MIT License

## 13. Support
For issues or questions, please refer to the project documentation or contact the development team.
