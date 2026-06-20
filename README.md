# InspectIC — Production Record Monitoring Dashboard

## 1. How to Run the Page

### Prerequisites
- **Node.js** 18+ and **npm** (or pnpm / yarn)
- A modern web browser (Chrome, Firefox, Edge, Safari)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open the URL shown in the terminal
#    Default: http://localhost:5173
```

To create a production build for deployment:

```bash
npm run build
```

The output goes to the `dist/` folder and can be served by any static host (Vercel, Netlify, etc.).

> **Note:** The page uses Vite's dev server and cannot be opened directly as a static `.html` file — it must be served via `npm run dev` or a production build.

---

## 2. What Features Were Completed

- **Clean Dark-themed Dashboard UI** — Premium glassmorphism design with radial gradient background, animated floating tech particles, and consistent card styling (20px border-radius, backdrop-blur, status accent borders).

- **AI Chatbox with Status-Based Querying** — Rule-based chatbot that responds to natural-language questions about inspection records. Supports time-based greetings, manufacturer listing ("which ones are from Intel?"), status counting ("how many passed?"), and part/lot lookups. No API key required.

- **Dropdown Menu (All Manufacturers)** — Custom-built filter dropdown replacing the native `<select>` for consistent dark-theme styling. Features click-to-open/close, hover states (`#F5F5F5` background, `cursor-pointer`), and explicit `z-[9999]` layering to avoid clipping inside the toolbar.

- **Data-driven Modals with Dynamic Barcode Generation** — Clicking any card opens a detail modal populated with full record data. Barcodes are rendered inside the modal using JsBarcode (CODE128 format, white bars on transparent background, scannable).

- **Barcode Visibility Moved from Card Front to Modal** — Barcodes were initially displayed on each card for quick scanning, but were later moved exclusively into the detail modal to keep the card grid clean and uncluttered.

**Additional features:**
- Real-time search across part numbers
- Status filter buttons (PASS / FAIL / REVIEW)
- Sort by date or confidence
- Animated staggered card entrance (Framer Motion spring transitions)
- Hover lift effect on cards (spring stiffness 300, damping 20)
- Animated status badges with pulsing dot
- Confidence bar visualization
- Escape key closes modals

---

## 3. Any Assumptions Made

### Data Structure
- A hardcoded JSON file (`src/data/inspectionData.json`) holds 4 sample records. Each record includes: `id`, `partNumber`, `manufacturer`, `lotNumber`, `dateCode`, `status` (PASS | FAIL | REVIEW), `confidence` (0–100), `barcodeText`, `ocrText`, and `remarks`.
- No backend API — all data is loaded at startup from the JSON file and stored in React state.
- The chatbot reads the full dataset and dynamically computed stats (counts per status, unique manufacturers).

### UI State Management
- Filter, search, and sort state are managed with React `useState` in `App.tsx` and passed down as props — no global state library.
- The detail modal visibility is controlled by a `selectedRecord` state; setting it to `null` closes the modal.
- The chatbot panel toggles via a FAB button; the panel itself maintains its own message history.

### Chatbot Logic
- The engine uses simple keyword matching (`chatEngine.ts`) — no NLP or AI API. It matches queries against known patterns (status counts, manufacturer lookups, part/lot searches) and returns the most relevant response.
- Greetings are time-aware ("Good morning", "Good afternoon", "Good evening").

### Styling
- Tailwind CSS v4 with custom CSS variables for brand colors, border radius, and shadows. The body background is `#000000` with a canvas-drawn radial gradient overlay.
- All interactive surfaces use glassmorphism: `bg-white/[0.05] backdrop-blur-md border border-white/[0.08]`.

---

## 4. AI Tools, Templates, or External Libraries Used

### JavaScript / React Libraries
| Library | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool and dev server |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling and design system |
| **Framer Motion 12** | Animations (stagger, spring, AnimatePresence) |
| **Lucide React** | Icon set |
| **JsBarcode** | Client-side barcode generation (CODE128) |

### Development Tools
- **ESLint** with TypeScript rules for code quality
- **Vercel** for deployment (button link in README)

### AI Assistance
- This project was developed with **AI-assisted coding** using **Opencode** (powered by deepseek-v4), which helped generate components, styles, and logic based on natural-language instructions throughout development.
