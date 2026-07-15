# NextKey — Rules Document

---

## 1. What to Do / Use

### Technology & Setup
*   **TypeScript Everywhere:** Maintain strict type safety across both `/client` and `/server`. Avoid utilizing `any` generic declarations.
*   **Next.js App Router:** Construct routing inside the `/client` utilizing the modular folder directories nested in `src/app/` (using layout files and explicit `page.tsx` assets).
*   **Native MongoDB Driver:** Formulate all backend Atlas database workflows exclusively through the raw `mongodb` Node.js drivers.
*   **Single MongoClient Instance:** Re-use a single, persistent MongoDB client instance across requests to prevent connection threshold exceptions.

### Styling & UI/UX
*   **Color Restriction Config:** Define exactly 3 primary colors + 1 neutral color inside `tailwind.config.ts`. All interactive page nodes must reuse these design constraints.
*   **Consistent Visual Styling:** Ensure all cards, input boxes, buttons, margins, and borders use uniform radii, shadow limits, and line heights.
*   **Skeleton Loaders:** Write loading states utilizing matching shapes (skeleton loaders) during API retrieval periods.
*   **Interactive Toggles:** Build credentials quick-fills (buttons) into the Login page UI allowing immediate Tenant/Landlord mock access.

---

## 2. What to Avoid

*   **No Mongoose ODM:** Do not install or import `mongoose`. All queries must execute raw collection access functions (`db.collection('...').findOne()`, etc.).
*   **No Placeholder / Dummy Content:** Do not utilize "Lorem Ipsum" text or broken image vectors. Use realistic placeholder info (e.g. realistic BDT/USD prices, actual Dhaka/cities addresses, actual rooms descriptions, real images URLs).
*   **No Inline Color Styling:** Avoid writing ad-hoc clean CSS declarations or layout paddings that deviate from the unified configurations in Tailwind.
*   **No Hardcoded Credentials or Keys:** Avoid saving database URIs, JWT signatures, or platform server links directly within code blocks. Always access these via `.env` imports.
*   **No Unnecessary Dashboard Paths:** Avoid building a dedicated standalone user dashboard or admin control page. Use roles inside the global responsive navbar to control component routes instead.

---

## 3. Libraries, Error Handling, and the Boundary for AI

### Allowed Libraries
Ensure dependencies conform strictly to this listing:
*   **Client Module (`/client`):**
    *   `next` (App Router)
    *   `react`, `react-dom`
    *   `tailwindcss`
    *   `recharts` (rendering listing analytics)
    *   `axios` (HTTP requests)
    *   `lucide-react` or `react-icons` (icons)
*   **Server Module (`/server`):**
    *   `express`
    *   `mongodb` (raw Node.js database client)
    *   `jsonwebtoken` (JWT keys)
    *   `bcryptjs` (passwords encryption)
    *   `cors`, `dotenv`
    *   `tsx` / `ts-node-dev` (development server running script tasks)

### Error Handling Guidelines
*   **Backend Server:**
    *   All routes must be wrapped with try-catch blocks or an Express global error-handling middleware.
    *   Return clear status codes (e.g. `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Server Error`).
    *   API error payloads must be formatted consistently as JSON: `{ "success": false, "message": "User-friendly error explanation" }`.
*   **Frontend Client:**
    *   Catch API request failures gracefully. Show user-friendly toast alerts or validation warning banners.
    *   Prevent interface crashes by validating undefined variables (e.g., array checks before mapping lists).
    *   Implement loading states specifically to keep the app responsive.

### AI Operational Boundaries (Limits for Antigravity)
*   **Rubric Over Scope Execution:** Do not introduce extra packages (such as Stripe payments, Mailgun configurations, complex admin management layers) unless explicitly prompted by the user. Keep to structural requirements.
*   **Directory Integrity:** Do not generate any codebase assets outside `/client` and `/server`.
*   **Configuration Approval:** Ask the user before writing custom script commands inside `package.json` that require external hosting packages.
*   **Database Credentials protection:** Do not create dummy Atlas databases URIs strings locally to commit to GitHub repos. Tell the user exactly which configuration environment variables to add into local `.env` files.
