# LearnOS — Student Dashboard

A futuristic, animated student dashboard built with Next.js 15 (App Router), Supabase, Tailwind CSS, and Framer Motion.

**[Live Demo](https://your-vercel-url.vercel.app)** · **[GitHub](https://github.com/your-username/learning-dashboard)**

---

## Architecture Overview

### Server / Client Component Split

This app uses a deliberate boundary between RSC (React Server Components) and client components, following the principle: **push data fetching to the server, push interactivity to the client.**

```
app/page.tsx                  ← Server Component (root)
├── Sidebar                   ← Client Component (interactive nav state)
├── HeroTile                  ← Client Component (Framer Motion animations)
├── <Suspense>
│   └── CourseList            ← Server Component (async Supabase fetch)
│       └── CourseCard[]      ← Client Component (hover animations)
├── ActivityTile              ← Client Component (Framer Motion grid)
└── BottomNav                 ← Client Component (mobile state)
```

**Why Server Components for data fetching?**
- Zero client-side waterfall: data is resolved on the server before streaming HTML
- Supabase credentials never reach the browser
- RSC payload is smaller than a fetch + hydration cycle

**Why Suspense over `loading.tsx`?**
`loading.tsx` replaces the entire page during navigation. Suspense boundaries allow *granular* fallbacks — the hero tile and sidebar render immediately while only the course grid shows skeletons, giving users faster perceived load.

### Supabase Integration

Uses `@supabase/ssr` (not the legacy `@supabase/auth-helpers-nextjs`). The server client is built inside each request using `cookies()` from `next/headers`, which means:
- No singleton leak between requests
- Compatible with React's concurrent rendering model
- Auth tokens are forwarded correctly via cookies (ready for user auth if you add it later)

### Animation Strategy (Zero Layout Shift)

All animations use **only `transform` and `opacity`** — the GPU-composited properties that don't trigger reflow or repaint:

```tsx
// ✅ Correct — GPU composited
whileHover={{ scale: 1.015 }}
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}

// ❌ Wrong — triggers layout
whileHover={{ width: '110%' }}
animate={{ height: 'auto' }}
```

Spring physics are used throughout (`type: "spring", stiffness: 300, damping: 20`) to give motion a natural, non-linear feel. The sidebar navigation uses `layoutId` for the highlight indicator, which lets Framer Motion FLIP-animate the element between positions without JS layout calculations.

---

## Setup

### 1. Clone & install

```bash
git clone https://github.com/your-username/learning-dashboard.git
cd learning-dashboard
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Open the **SQL Editor** and run the contents of `supabase-seed.sql`
3. Copy your project URL and anon key from **Settings → API**

### 3. Configure environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### 4. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deploy to Vercel

```bash
npx vercel
# Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
# in your Vercel project settings under Environment Variables
```

---

## Supabase Table Schema

```sql
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null default 'BookOpen',
  created_at timestamptz not null default now()
);
```

Supported `icon_name` values: `Code2`, `Brain`, `Database`, `Terminal`, `Globe`, `Cpu`, `Layers`, `Palette`, `Shield`, `Zap`, `BookOpen`, `BarChart3`

---

## Design Decisions

- **Dark mode only** with a `void` palette (near-blacks from `#080a0f` to `#232b3d`), accented by `iris` purple, `nova` blue, `jade` green, and `ember` orange — each mapped to a course for visual distinction.
- **Grain texture + gradient mesh** on cards: two `absolute` positioned overlays (`bg-noise` + radial gradient) that create depth without blurring or triggering compositing layers.
- **Semantic HTML**: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<ul>` throughout — no div soup.
- **Responsive**: sidebar on desktop, icon-only on tablet (768–1024px), bottom nav on mobile (<768px).

---

## Challenges

1. **Suspense + async Server Components**: Next.js 15 with React 19 RC changes `params` and `cookies()` to return Promises. Had to `await cookies()` in the Supabase client factory.
2. **Framer Motion + RSC**: Framer Motion components must be `"use client"`. Solved by making all animated components client-side while keeping data-fetching logic in RSC (`CourseList`), then passing data down as props.
3. **Zero layout shift on hover**: Initially used `box-shadow` changes on hover which caused repaints. Migrated to `scale` transform + pre-painted border glow layers that toggle opacity only.
