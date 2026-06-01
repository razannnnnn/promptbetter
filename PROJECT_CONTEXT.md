# PromptBetter — Project Context

Dokumen ini untuk onboarding AI/developer. Terakhir diperbarui setelah migrasi **NextAuth → Clerk**.

---

## 1. Apa proyek ini?

**PromptBetter** — web app Next.js yang **memperbaiki/mengoptimalkan prompt AI** (input bebas, output prompt dalam **Bahasa Inggris**). UI gelap + glassmorphism, aksen **lime `#ccff00`**. Live: [promptbetter.vercel.app](https://promptbetter.vercel.app).

**Alur utama:** user mengetik prompt → `POST /api/improvePrompt` → Groq (LLaMA 3.3 70B) → hasil ditampilkan + salin ke clipboard.

**Rate limit (MongoDB):**

- Guest (by IP): **5 request/hari**
- Login (Clerk `userId`): **10 request/hari**

---

## 2. Yang sudah dikerjakan

| Topik | Status |
|--------|--------|
| Auth | Migrasi **NextAuth v4** → **Clerk** (OAuth GitHub/Google + email + verifikasi di Dashboard) |
| Halaman auth | `/sign-in`, `/sign-up`, `/profile` |
| UI auth | Form **tanpa card ganda**; styling flat di `clerkAppearance.js` |
| Header | `SignedIn` / `SignedOut` (bukan `Show` — tidak diekspor di `@clerk/nextjs` 6.x) |
| API | `improvePrompt` pakai `auth()` dari `@clerk/nextjs/server` |
| Middleware | Home + API improve **publik**; `/profile` **protected** |
| Docs | README, CLAUDE.md, GEMINI.md, `.env.example` |

**Hapus jika masih ada (sisa NextAuth):**

- `src/app/api/auth/[...nextauth]/`
- `src/components/SessionWrapper.jsx`

---

## 3. Tech stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js 16.2.2 (App Router) |
| UI | React 19.2.4, JavaScript (bukan TypeScript) |
| Styling | Tailwind CSS 4 — `src/app/globals.css` |
| Auth | Clerk — `@clerk/nextjs`, `@clerk/themes` |
| AI | Groq SDK — `llama-3.3-70b-versatile` |
| Database | MongoDB + Mongoose (rate limits) |
| Animation | `motion` (motion/react) |
| Icons | lucide-react |

---

## 4. Struktur folder

```
nextjs-promptbetter/
├── .env.example              # Template env (jangan commit .env.local)
├── PROJECT_CONTEXT.md        # File ini
├── next.config.mjs           # remotePatterns: img.clerk.com
├── package.json
├── src/
│   ├── middleware.js         # Clerk: route publik vs protected
│   ├── app/
│   │   ├── layout.js         # ClerkProvider + appearance global
│   │   ├── page.js           # Home: Header + Hero + Footer
│   │   ├── globals.css       # .glass, .glow, --color-brand
│   │   ├── sign-in/[[...sign-in]]/page.js
│   │   ├── sign-up/[[...sign-up]]/page.js
│   │   ├── profile/[[...profile]]/page.js
│   │   └── api/improvePrompt/route.js
│   ├── components/
│   │   ├── Header.jsx        # Nav, Donate, Clerk auth buttons
│   │   ├── Hero.jsx          # State result + loading
│   │   ├── inputArea.jsx     # Textarea + submit + error limit
│   │   ├── Result.jsx        # Output + copy
│   │   └── Footer.jsx
│   └── lib/
│       ├── clerkAppearance.js   # PUSAT styling & bahasa Clerk
│       ├── systemPrompt.js      # Instruksi AI prompt engineer
│       ├── rateLimit.js         # 5 guest / 10 user per hari
│       └── mongodb.js
└── public/
```

---

## 5. Alur autentikasi (Clerk)

**Route publik (middleware):** `/`, `/sign-in`, `/sign-up`, `/api/improvePrompt`

**Protected:** `/profile` (dan route lain di luar `isPublicRoute`)

```
Guest  → improvePrompt (identifier = IP, limit 5/hari)
User   → improvePrompt (identifier = Clerk userId, limit 10/hari)
/sign-in, /sign-up → komponen Clerk (<SignIn />, <SignUp />)
/profile → <UserProfile />
```

---

## 6. Di mana edit UI/UX?

### A. Clerk (login, daftar, profil)

| File | Fungsi |
|------|--------|
| **`src/lib/clerkAppearance.js`** | **File terpenting** untuk Clerk |
| | `authFormAppearance` → `<SignIn />`, `<SignUp />` (form flat, tanpa card) |
| | `clerkAppearance` → global via `ClerkProvider` di `layout.js` |
| | `profileAppearance` → `<UserProfile />` di `/profile` |
| | `clerkLocalization` → teks Indonesia |
| `src/app/sign-in/[[...sign-in]]/page.js` | Layout halaman masuk (judul, logo, link Daftar) |
| `src/app/sign-up/[[...sign-up]]/page.js` | Layout halaman daftar |
| `src/app/profile/[[...profile]]/page.js` | Layout halaman profil |
| `src/app/layout.js` | `ClerkProvider` + `appearance` + `localization` |
| `src/middleware.js` | Route public vs protected |
| `src/components/Header.jsx` | `SignInButton`, `SignUpButton`, `UserButton` |

**Clerk Dashboard** (bukan kode): OAuth providers, email + verifikasi, redirect URLs production.

**Jangan** bungkus `<SignIn />` / `<SignUp />` dengan `.glass` — menyebabkan card ganda.

### B. UI aplikasi utama

| File | Fungsi |
|------|--------|
| `src/app/globals.css` | Brand colors, `.glass`, `.glow` |
| `src/components/Hero.jsx` | Hero + state |
| `src/components/inputArea.jsx` | Input + submit + limit error |
| `src/components/Result.jsx` | Hasil + copy |
| `src/components/Header.jsx` | Logo, Donate, auth |
| `src/components/Footer.jsx` | Footer |

### C. Logika bisnis / AI

| File | Fungsi |
|------|--------|
| `src/lib/systemPrompt.js` | Aturan rewrite prompt (output English) |
| `src/app/api/improvePrompt/route.js` | Groq + rate limit + `auth()` |
| `src/lib/rateLimit.js` | Limit harian MongoDB |

---

## 7. Environment variables

Lihat `.env.example`. Ringkasan:

```env
GROQ_API_KEY=
MONGODB_URI=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

Tidak lagi: `NEXTAUTH_*`, `GITHUB_*`, `GOOGLE_*` (OAuth di Clerk Dashboard).

---

## 8. Perintah dev

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm run start
npm run lint
```

---

## 9. Catatan teknis

1. Pakai **`SignedIn` / `SignedOut`**, jangan **`Show`** dari `@clerk/nextjs` (build error di v6.x).
2. `authFormAppearance` menyembunyikan header/footer internal Clerk agar tidak duplikat dengan judul halaman.
3. `react-markdown` di `package.json` belum dipakai di UI.
4. UI campuran: hero/error **Indonesia**, hasil prompt **English** (`systemPrompt.js`).
5. Baca `AGENTS.md` / `node_modules/next/dist/docs/` untuk Next.js 16 breaking changes.

---

## 10. Prompt singkat untuk AI lain

```
Proyek PromptBetter (Next.js 16, JS, App Router): optimasi prompt via Groq API, UI dark glassmorphism brand #ccff00, auth Clerk, rate limit MongoDB 5/hari guest dan 10/hari user.

Struktur: src/app/page.js, src/components/{Header,Hero,inputArea,Result}, src/app/api/improvePrompt/route.js, src/middleware.js, src/lib/clerkAppearance.js, sign-in/sign-up/profile.

Edit UI Clerk: clerkAppearance.js + halaman sign-in/sign-up/profile. Edit UI app: globals.css + components. Jangan wrap SignIn/SignUp dengan glass card. Header: SignedIn/SignedOut bukan Show.

Env: GROQ_API_KEY, MONGODB_URI, Clerk keys. OAuth & email di Clerk Dashboard.
```
