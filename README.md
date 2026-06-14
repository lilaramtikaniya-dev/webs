# JSForge Runtime 🔥

> An educational JavaScript runtime built in C++ — with a full-stack web platform to showcase, test, and learn from it.

![JSForge Banner](https://placehold.co/1200x400/0a0a0f/3b82f6?text=JSForge+Runtime)

---

## 🚀 What is JSForge?

JSForge Runtime is a **JavaScript interpreter written from scratch in C++**. It accepts JavaScript source code as input and executes it through a pipeline of:

```
Source Code → Lexer → Parser → AST → Interpreter → Output
```

This project was built for a hackathon to demonstrate how real JavaScript engines work under the hood.

---

## ✨ Features

### Runtime (C++)
- Lexer / Tokenizer
- Recursive Descent Parser
- Abstract Syntax Tree (AST)
- Tree-Walk Interpreter
- Variables: `let`, `const`
- Data types: Numbers, Strings, Booleans, `null`, `undefined`
- Arrays and Objects
- Functions and Arrow Functions
- `if/else`, `switch`, `for`, `while`, `do-while`
- All arithmetic, comparison, and logical operators
- Array methods: `map`, `filter`, `reduce`, `find`, `every`, `some`
- String methods, Math object, Date object
- Spread / Rest operators
- Callback functions

### Web Platform
- 🎮 **Runtime Playground** — Monaco editor, live execution, output console
- 📚 **Documentation** — Full docs for Lexer, Parser, AST, Interpreter
- 🏗️ **Architecture** — Animated SVG pipeline diagram
- 🏆 **Leaderboard** — Submit and view runtime scores
- 🤖 **AI Mentor** — Streaming ChatGPT-style mentor with 4 modes
- ℹ️ **About** — Hackathon info, roadmap, team

---

## 📁 Project Structure

```
jsforge-runtime/
├── frontend/                    # Next.js 15 app
│   ├── app/
│   │   ├── layout.tsx           # Root layout with fonts & navbar
│   │   ├── globals.css          # Design tokens, glassmorphism, scrollbar
│   │   ├── page.tsx             # Landing page
│   │   ├── playground/page.tsx  # Runtime playground
│   │   ├── docs/page.tsx        # Documentation
│   │   ├── architecture/page.tsx
│   │   ├── leaderboard/page.tsx
│   │   ├── mentor/page.tsx      # AI Mentor (streaming)
│   │   └── about/page.tsx
│   ├── components/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   ├── particle-background.tsx
│   │   ├── feature-card.tsx
│   │   ├── faq-accordion.tsx
│   │   ├── stats-section.tsx
│   │   ├── timeline-section.tsx
│   │   ├── code-editor.tsx       # Monaco wrapper
│   │   ├── output-console.tsx    # Terminal output
│   │   ├── code-block.tsx        # Syntax-highlighted block
│   │   ├── documentation-sidebar.tsx
│   │   ├── architecture-flow.tsx # Animated SVG pipeline
│   │   ├── leaderboard-table.tsx # Animated rank table
│   │   ├── chat-window.tsx       # Chat message container
│   │   ├── message-bubble.tsx    # Individual message (w/ markdown)
│   │   ├── typing-indicator.tsx  # Animated dots
│   │   ├── chat-input.tsx        # Auto-resize textarea
│   │   ├── mode-selector.tsx     # Mode tabs
│   │   └── mentor-sidebar.tsx    # Quick prompts, learning level
│   ├── hooks/
│   │   └── use-chat.ts           # Chat state + streaming hook
│   ├── lib/
│   │   ├── utils.ts
│   │   └── docs-content.ts
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                     # Express + TypeScript API
│   ├── src/
│   │   ├── index.ts             # Server entry point
│   │   ├── routes/
│   │   │   ├── health.ts
│   │   │   ├── run.ts           # POST /run
│   │   │   ├── chat.ts          # POST /chat (OpenAI streaming)
│   │   │   └── leaderboard.ts   # GET/POST /leaderboard
│   │   ├── services/
│   │   │   └── runtime-service.ts  # Executes C++ binary or mock
│   │   └── middleware/
│   │       └── error-handler.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## 🛠️ Setup & Running Locally

### Prerequisites
- Node.js 18+
- npm or pnpm
- PostgreSQL (or a Railway database URL)
- OpenAI API Key (for AI Mentor)

### 1. Clone and install

```bash
git clone https://github.com/your-username/jsforge-runtime.git
cd jsforge-runtime
```

### 2. Setup Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
# → http://localhost:3000
```

### 3. Setup Backend

```bash
cd backend
cp .env.example .env

# Edit .env:
#   DATABASE_URL = your PostgreSQL URL
#   OPENAI_API_KEY = your OpenAI key

npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
# → http://localhost:4000
```

### 4. Connect your C++ runtime (optional)

Compile your JSForge C++ binary, then in `backend/.env`:
```
RUNTIME_BINARY_PATH=/path/to/jsforge
```

Without this, the playground runs in **mock mode** for demo purposes.

---

## 🌐 Deployment

### Frontend → Vercel

```bash
cd frontend
vercel deploy
# Set env vars in Vercel dashboard:
#   NEXT_PUBLIC_API_URL = https://your-backend.railway.app
#   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = ...
```

### Backend → Railway

1. Create a new Railway project
2. Add a PostgreSQL database
3. Deploy from GitHub
4. Set environment variables in Railway dashboard
5. Copy the generated URL → set as `NEXT_PUBLIC_API_URL` in Vercel

---

## 🤖 AI Mentor Modes

| Mode | Description |
|------|-------------|
| **AI Tutor** | Ask anything about JS, compilers, lexers, parsers, ASTs, interpreters |
| **Debugger** | Paste C++ or JS code — get bug analysis, fix suggestions, complexity review |
| **Learning Mode** | Choose depth: ELI5, Beginner, Intermediate, Advanced |
| **Challenge Generator** | Generate practice challenges by difficulty |

---

## 📦 Adding Dependencies

If `react-markdown`, `react-syntax-highlighter`, or `@monaco-editor/react` aren't in your `package.json`, add:

```bash
cd frontend
npm install react-markdown react-syntax-highlighter @monaco-editor/react
npm install -D @types/react-syntax-highlighter
```

---

## 🔑 Environment Variables Summary

### Frontend (`frontend/.env.local`)
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend URL (default: `http://localhost:4000`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key (optional) |
| `CLERK_SECRET_KEY` | Clerk secret key (optional) |

### Backend (`backend/.env`)
| Variable | Description |
|----------|-------------|
| `PORT` | API port (default: `4000`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `OPENAI_API_KEY` | OpenAI API key for AI Mentor |
| `FRONTEND_URL` | For CORS (default: `http://localhost:3000`) |
| `RUNTIME_BINARY_PATH` | Path to C++ binary (leave empty for mock) |

---

## 🏆 Hackathon

Built in 30 days for the JSForge Hackathon. Every line of C++ — from the first token to the final evaluated expression — was written from scratch.

**Tech Stack:** C++17 · Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · Monaco Editor · Express · Prisma · PostgreSQL · OpenAI · Clerk · Vercel · Railway

---

## 📄 License

MIT
