# Craftimacy - Ecommerce & Admin System

Craftimacy is a boutique Next.js e-commerce platform built for a small independent handmade/artisan products business. It allows for beautiful customer-facing catalogues along with a comprehensive, easy-to-use Admin Dashboard.

## Features Built

- **Customer Facing Website**: Dynamic Home Page, Shop, and Product tracking built with modern server components.
- **WhatsApp Ordering**: Users can push their entire cart to a formatted WhatsApp message instantly.
- **Admin Dashboard**: Protected via Supabase Authentication. Allows tracking orders, managing products, and viewing metrics.
- **Dynamic Inventory**: Stock levels decrement automatically when orders are placed, with Out-of-Stock warnings.
- **Supabase Integration**: Next.js App Router compatible Supabase SSR, fetching data cleanly and handling image uploads securely via Server Actions.

## Tech Stack

- Next.js 16.3.8 (App Router)
- React 19, Tailwind CSS v4, Framer Motion, Lucide React
- Supabase (Postgres, Auth, Storage)

## Local Setup

### 1. Supabase Project

1. Create a new project on [Supabase](https://supabase.com).
2. Create a public Storage Bucket named `product-images`.
3. In the SQL Editor, copy and execute the `supabase/migrations/00_initial_schema.sql` file.

### 2. Environment Variables

Duplicate `.env.example` to `.env.local` and fill in your Supabase details:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER="919876543210"
```

### 3. Create Admin Account

Go to your Supabase project -> Authentication -> Add a User. Use this email and password to log in at `/admin/login`.

### 4. Running Locally

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Managing Products & Categories

Log in to `/admin` to access the portal. You can navigate to **Products -> Add New Product** to insert products. Images uploaded will securely be pushed to your Supabase Storage bucket and cross-referenced in your product listings!

## Deployment

Deploy to Vercel by importing the Git repository. Ensure you add your `.env` variables in the Vercel project settings prior to building.
