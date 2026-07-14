# NextKey — Product Requirements Document

## 1. What to Build
NextKey is a full-stack, typescript-based rental property marketplace application. The platform connects individuals searching for housing with property owners listing their rentals. It consists of a complete frontend client and a backend API server, featuring interactive search tools, dynamic listing filters, public details pages, reviews, rental request submissions, and a landlord management space complete with visual analytics.

---

## 2. Targeted Users
The application supports three user states/roles:
*   **Visitor (Logged-out Guest):** Users looking to browse, search, and view properties. They can access the Home page, the Explore page, and individual Property Details pages, but cannot request properties or leave reviews.
*   **Tenant (Logged-in User):** Active seekers who can browse listings, submit rental requests, write reviews/ratings, view their rental history (My Requests), and manage their profiles.
*   **Landlord (Logged-in Admin-Equivalent):** Property owners who can list new rentals (Add Property) and manage their active listings (Manage Properties), complete with listing metrics charts. They also have standard Tenant privileges (browsing/searching).

---

## 3. Features

### Core Authentication & Authorization
*   **Sign Up & Login:** Clean forms with full client and server-side validation. Allows users to register with a specific role (Tenant or Landlord).
*   **Demo Login Buttons:** Two buttons on the Login page to instantly auto-fill credentials for:
    *   *Demo Tenant* (satisfying "User" login requirements)
    *   *Demo Landlord* (satisfying "Admin" login requirements)
*   **Protected Routes:** Authorization middleware blocks Tenants and Visitor guests from entering listing tools (Add/Manage Property), redirecting them to `/login`.

### Landing / Home Page
*   **Responsive Sticky Navbar:** Displays 3 links when logged out and 5+ links when logged in (adapted per user role).
*   **Hero Section:** 60–70% screen height with a CTA button ("Explore Properties"), an auto-rotating background image slider, and an interactive location/type search input.
*   **Core Landing Sections (9 total):**
    *   Hero (Search & Slide)
    *   Featured Properties (4 cards grid)
    *   Categories (Apartment, House, Studio, Room selector)
    *   How It Works (4-step visual flow)
    *   Platform Highlights/Features
    *   Testimonials & Reviews
    *   Platform Statistics strip
    *   FAQ Accordion
    *   Final Newsletter Signup / CTA
*   **Footer:** Fully functional internal links, social media links, and real contact information.

### Listing, Search & Filters
*   **Explore Listings Page:** Grid display of all rentals using skeleton loaders while loading data.
*   **Multi-Criteria Filtering (4 fields):** Filter properties dynamically by Location/City, Price Range, Property Type, and Bedrooms.
*   **Sorting Options:** Sort items by Price (low to high, high to low) and Date (Newest first).
*   **Search Bar:** Full-text search matching property titles and locations.
*   **Pagination:** Interactive navigation pages to handle large property catalogs.

### Core Card Component
*   **Consistent UI:** Uniform size, margins, border-radius, and visual styling across Home, Explore, and Manage listings pages.
*   **Content:** Contains property image, title, short description, meta specs (price, location, type, bedrooms), and a "View Details" button.
*   **Desktop Layout:** Configured for 4 cards per row.

### Property Details Page
*   **Content:** Publicly accessible page featuring a property image gallery, clear pricing and specifications list (bathrooms, bedrooms, property type), full detailed description, active star-ratings reviews left by tenants, and a "Related Properties" section displaying 3–4 similar listings.

### Landlord Protected Actions
*   **Add Property Page:** Form requiring Title, Short Description, Full Detailed Description, Price/Month, Location, Property Type, Bedrooms, Bathrooms, and Image URL. Redirects to Manage Properties on success.
*   **Manage Properties Page:** A clean table or grid displaying the logged-in landlord's listings, containing direct actions to "View Details" or "Delete" (requires delete confirmation).
*   **Analytics Chart:** An interactive Recharts visual chart showing property data (e.g., properties listed by category or rental inquiries per month).

### Additional Pages
*   **About Page:** Explains the NextKey mission, team background, and values.
*   **Contact Page:** Static map/location details with a working contact email and contact form (Name, Email, Message) with validation.
