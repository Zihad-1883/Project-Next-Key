# NextKey — Design System Specification

This document defines the branding guidelines, design tokens, color configurations, and typography standards to ensure a premium, modern, and unified UI across NextKey.

---

## 1. Color Palette (3 Primaries + 1 Neutral)

To comply with the rubric constraint, NextKey is styled exclusively using **three primary colors** and **one neutral color**. These are defined in Tailwind config and mapped to custom CSS variables.

### Palette Overview

| Token Name | Key Color | HEX / HSL Value | Purpose |
|---|---|---|---|
| **Primary 1 (Indigo)** | Brand Primary | `#4F46E5` / `hsl(243, 75%, 59%)` | Focus buttons, links, brand badges, navigation items |
| **Primary 2 (Teal)** | Action / Success | `#0D9488` / `hsl(175, 84%, 37%)` | Booking success highlights, CTAs, icons, category filters |
| **Primary 3 (Rose)** | Alert / Danger | `#E11D48` / `hsl(347, 77%, 50%)` | Price tags, delete buttons, system errors, map listings pins |
| **Neutral (Slate)** | Layout & Text | See scale below | Backgrounds, layouts, borders, texts |

### Neutral Color Scale (Slate)
To support clean text heirarchy and card spacing without adding new colors, we use variations of the Slate neutral color:
*   **Background (Light):** `#F8FAFC` (Slate 50)
*   **Background (Dark/Card):** `#FFFFFF` (White) / `#F1F5F9` (Slate 100)
*   **Border / Divider:** `#E2E8F0` (Slate 200)
*   **Subtext:** `#64748B` (Slate 500)
*   **Body Text:** `#334155` (Slate 700)
*   **Heading Text:** `#0F172A` (Slate 900)

---

## 2. Typography & Fonts

NextKey uses Google Fonts loaded dynamically through Next.js `next/font/google` to guarantee optimal performance, zero layout shift, and clean modern aesthetics.

*   **Display Font (Headings):** **Outfit** (Sans-serif)
    *   *Weight:* Medium (500), SemiBold (600), Bold (700)
    *   *Usage:* Navbar headers, Hero sections, Listing titles, Section headers.
*   **Body Font (Text):** **Inter** (Sans-serif)
    *   *Weight:* Regular (400), Medium (500), SemiBold (600)
    *   *Usage:* Body copy, form fields, listings specifications, review descriptions.

### Typography Scale

| Tag | Tailwind Class | Font Face | Weight | Size | Line Height | Description |
|---|---|---|---|---|---|---|
| **H1** | `text-4xl md:text-5xl` | Outfit | Bold (700) | 36px - 48px | `leading-tight` | Hero display headings |
| **H2** | `text-2xl md:text-3xl` | Outfit | SemiBold (600) | 24px - 30px | `leading-snug` | Section titles |
| **H3** | `text-xl` | Outfit | Medium (500) | 20px | `leading-normal` | Card Headers, form groups |
| **Body** | `text-base` | Inter | Regular (400) | 16px | `leading-relaxed` | Descriptions, body copy |
| **Meta** | `text-sm` | Inter | Medium (500) | 14px | `leading-none` | Badge pills, cards specs |

---

## 3. Component Styles & Theme States

### Layout Spacing Rules
*   **Section Padding:** Standard vertical padding is `py-16` or `py-20` on desktop, `py-12` on mobile.
*   **Page Container margins:** Utilizes `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for aligned page borders.
*   **Grid gap:** Reusable listing card grids utilize `gap-6` or `gap-8`.

### Core Card Design Tokens
To guarantee the cards look identical across the entire application:
*   **Border Radius:** `rounded-2xl` (16px) or `rounded-xl` (12px).
*   **Shadow:** Subtle `shadow-sm` transitioning to hover states via `hover:shadow-md transition-shadow duration-200`.
*   **Aspect Ratio (Images):** Consistent `aspect-video` (16:9) or `aspect-square`.

### Light Context vs. Dark Context Variables (CSS Implementation)
Mapped variables configured inside `/client/src/styles/globals.css`:

```css
@layer base {
  :root {
    --primary-indigo: 243 75% 59%;
    --primary-teal: 175 84% 37%;
    --primary-rose: 347 77% 50%;
    
    --background: 210 40% 98%;    /* Slate 50 */
    --card: 0 0% 100%;             /* White */
    --foreground: 222 47% 11%;     /* Slate 900 */
    --border: 214 32% 91%;         /* Slate 200 */
  }

  /* Support for clean high-contrast UI */
  .dark {
    --background: 222 47% 11%;     /* Slate 900 */
    --card: 217 33% 17%;           /* Slate 800 */
    --foreground: 210 40% 98%;     /* Slate 50 */
    --border: 217 32% 17%;         /* Slate 800 */
  }
}
```
