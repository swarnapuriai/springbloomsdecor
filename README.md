# Spring Blooms Decor

A full-stack website for **Spring Blooms Decor** — an Indian wedding and event decor business based in Dallas–Fort Worth, TX.

Built with **Next.js 16**, **Supabase**, **Tailwind CSS**, and **shadcn/ui**. Deployed on **Vercel**.

---

## Features

### Public Website
- **Hero Carousel** — Full-screen image slider (admin-managed)
- **Services** — 6 service categories with detailed feature lists
- **Photo Gallery** — Masonry grid with category filtering
- **Pricing** — Wedding and event packages
- **About** — Brand story, values, and stats
- **Testimonials** — Client reviews with star ratings
- **FAQ** — Grouped by category with accordion
- **Contact** — Contact form, info, and Google Maps embed

### Admin Panel (`/admin`)
- Password-protected via Supabase Auth
- Manage **hero carousel** (upload, reorder, hide/show, delete)
- Manage **gallery images** (upload with category tagging)
- Manage **services** (add/edit/delete with features)
- Manage **pricing packages** (all fields editable)
- Manage **testimonials** (add/edit/delete)
- Manage **FAQs** (add/edit/delete, grouped by category)
- Manage **contact info, social links, and about story**

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 (App Router) | Framework |
| Supabase | Database, Auth, Storage |
| Tailwind CSS v4 | Styling |
| shadcn/ui (Base UI) | UI components |
| Embla Carousel | Hero & testimonials carousel |
| Lucide React | Icons |
| Vercel | Deployment |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/swarnapuriai/springbloomsdecor.git
cd springbloomsdecor
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql` — this creates all tables, RLS policies, and seed data
3. Go to **Storage** and create two **public** buckets: `carousel` and `gallery`
4. Go to **Authentication → Users** and create your admin user (email + password)

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Find these in your Supabase dashboard under **Settings → API**.

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` for the website and `http://localhost:3000/admin` for the admin panel.

---

## Deployment to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add the same environment variables in **Vercel → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy — Vercel auto-deploys on every push to `main`

---

## Supabase Storage Setup

After creating the Supabase project, set up storage buckets:

1. Go to **Storage** in your Supabase dashboard
2. Create a bucket named `carousel` — set to **Public**
3. Create a bucket named `gallery` — set to **Public**

---

## Admin Access

Navigate to `/admin/login` and sign in with the email/password you created in Supabase Authentication.

> The admin user must be created manually in your Supabase project under **Authentication → Users → Add User**.

---

## Theme

Indian wedding aesthetic for USA:
- **Primary**: Deep Maroon `#7B1C1C`  
- **Accent**: Gold `#C9A84C`  
- **Secondary**: Marigold Orange `#E07B39`  
- **Background**: Ivory/Cream `#FDF6EC`  
- **Fonts**: Playfair Display (headings) + Lato (body)

---

## Project Structure

```
├── app/
│   ├── (public)/          # Public pages with Navbar + Footer
│   │   ├── page.tsx       # Homepage
│   │   ├── gallery/
│   │   ├── services/
│   │   ├── pricing/
│   │   ├── about/
│   │   ├── testimonials/
│   │   ├── faq/
│   │   └── contact/
│   ├── admin/             # Protected admin pages
│   │   ├── login/
│   │   ├── carousel/
│   │   ├── gallery/
│   │   ├── services/
│   │   ├── pricing/
│   │   ├── testimonials/
│   │   ├── faq/
│   │   └── contact/
│   └── layout.tsx
├── components/
│   ├── public/            # Public-facing components
│   ├── admin/             # Admin UI components
│   └── ui/                # shadcn/ui components
├── lib/
│   └── supabase/          # Supabase clients + types
├── supabase/
│   └── schema.sql         # Database schema + seed data
├── proxy.ts               # Route protection (Next.js 16)
└── .env.local.example
```
