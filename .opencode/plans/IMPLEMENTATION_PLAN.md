# INSPECTIC — Implementation Plan

## System Overview

InspectIC is a single-page React dashboard for Converge's quality inspection lab. It lets engineers and inspectors search, filter, sort, and review inspection records of electronic components (ICs). Built with **Vite + React + TypeScript + Tailwind CSS v4**.

---

## 1. Reference Systems Researched

| System | Relevance | Pattern Used |
|--------|-----------|-------------|
| **CoAI-PCB** (React + TS) | PCB inspection dashboard | Card results, confidence scores, status indicators |
| **Viscom vSPC DataVision** | Web-based SPC | Stats overview bar, filtering, drill-down detail |
| **NEXSPC** | Quality monitoring | Top stats bar, real-time filter, card layout |
| **UDMTEK** | Defect analysis platform | Status color-coding, detail panels, data aggregation |
| **InspecTech** (Next.js + Tailwind) | Inspection management | Feature-based structure, session filters, dashboards |

**Common patterns across all:** stats bar at top → search + filter toolbar → card/grid results → click-to-detail → empty states → status color-coding.

---

## 2. Design System

### Color Theme

```
Primary:
  #000000  —  main text, headings
  #C83A26  —  brand accent, active states, FAIL status, buttons
  #FFFFFF  —  backgrounds, cards

Secondary:
  #464646  —  secondary text, labels
  #9E9E9E  —  borders, dividers, disabled, placeholders

Semantic (status):
  PASS   —  #16a34a (green)
  FAIL   —  #C83A26 (brand red)
  REVIEW —  #d97706 (amber)
  low-confidence highlight —  bg-red-50 + text-red-700
```

### Typography

- Font: Inter (sans-serif) — loaded via Google Fonts
- Sizes: Tailwind defaults (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`)

### Spacing

- Tailwind spacing scale (`p-4`, `gap-4`, `gap-6`, etc.)
- Card padding: `p-4`
- Section gaps: `gap-6`

---

## 3. Architecture

### Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 19 | Standard, component-based |
| Language | TypeScript | Type safety, self-documenting |
| Bundler | Vite | Fast HMR, modern |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| State | useState (local) | Simple enough for this scope |
| Data | Static JSON file | No backend needed |
| Icons | Lucide React | Clean, consistent icon set |

### State Design

All state lives in `App.tsx` via `useState`, passed down as props. No context or external store needed for this scope.

```
searchTerm: string
statusFilter: 'ALL' | 'PASS' | 'FAIL' | 'REVIEW'
manufacturerFilter: string
sortOrder: 'none' | 'asc' | 'desc'
selectedItem: InspectionRecord | null
```

Derived data via `useMemo`:

- `filteredData` — applies search + status + manufacturer filters
- `sortedData` — applies confidence sort on filtered data
- `stats` — { total, passCount, failCount, reviewCount } computed from filteredData

### TypeScript Interface

```typescript
interface InspectionRecord {
  id: number;
  partNumber: string;
  manufacturer: string;
  lotNumber: string;
  dateCode: string;
  status: 'PASS' | 'FAIL' | 'REVIEW';
  confidence: number;
  barcodeText: string;
  ocrText: string;
  remarks: string;
}
```

---

## 4. Component Tree

```
App
├── Header
│   ├── Logo/Titles (InspectIC branding)
│   └── SearchBar (text input with magnifying glass icon)
├── StatsBar
│   └── StatCards (Total | PASS | FAIL | REVIEW — color-coded)
├── FilterBar
│   ├── StatusFilter (button group: ALL | PASS | FAIL | REVIEW)
│   ├── ManufacturerFilter (select dropdown, dynamically populated)
│   └── SortControl (button: toggle confidence ↑↓)
├── InspectionList
│   ├── InspectionCard × N
│   │   ├── StatusBadge (color-coded label)
│   │   ├── ImagePlaceholder (gray box with chip icon)
│   │   ├── PartInfo (partNumber, manufacturer, lotNumber, dateCode)
│   │   └── ConfidenceScore (number, red highlight if <80%)
│   └── (or) EmptyState (when no results match)
└── DetailPanel (slide-out sidebar, conditional)
    ├── PanelHeader (partNumber, manufacturer, statusBadge, close button)
    ├── ConfidenceDisplay
    ├── BarcodeSection (label + monospace text)
    ├── OcrSection (label + text)
    └── RemarksSection (label + text)
```

---

## 5. File Structure

```
inspectic/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/                   # Reusable primitives
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   ├── Header.tsx
│   │   ├── StatsBar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterBar.tsx
│   │   ├── SortControl.tsx
│   │   ├── InspectionCard.tsx
│   │   ├── InspectionList.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ImagePlaceholder.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── DetailPanel.tsx
│   │   └── ConfidenceBadge.tsx
│   ├── data/
│   │   └── inspectionData.json
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── filterSort.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 6. PHASES

---

### PHASE 0: Project Scaffolding & Configuration

**Objective:** Initialize the project with Vite + React + TS + Tailwind, establish the color theme, create folder structure, add sample data, and verify the dev server runs.

**Files created/touched:**
- `package.json` (generated by Vite)
- `vite.config.ts`
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- `tailwind.config.ts` — define custom colors
- `src/index.css` — Tailwind directives + CSS variables
- `src/main.tsx` — entry point
- `src/App.tsx` — minimal placeholder
- `src/data/inspectionData.json` — sample data
- `src/types/index.ts` — TypeScript interfaces
- `index.html`

**Implementation details:**
1. Run `npm create vite@latest . -- --template react-ts`
2. Install: `tailwindcss @tailwindcss/vite`
3. Configure `tailwind.config.ts` with all theme colors
4. Create `inspectionData.json` with the 4 records (validated JSON)
5. Define `InspectionRecord` TypeScript interface
6. Verify `npm run dev` works

**Branch:** None (fresh scaffold)

**Commit message:** `chore: scaffold project with Vite + React + TypeScript + Tailwind`

---

### PHASE 1: Core Layout & UI Primitives

**Objective:** Build the app shell — Header with branding, responsive layout wrapper, and reusable UI components (Badge, Button, Card). Also create the `filterSort.ts` utility module.

**Files created/touched:**
- `src/components/ui/Badge.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/Header.tsx`
- `src/utils/filterSort.ts`
- `src/App.tsx` (update — add layout)
- `src/index.css` (update — add utility classes)
- `src/App.css` (create — animations)

**Implementation details:**
1. **Header**: Left — InspectIC logo/text with chip icon. Black bg, white text, brand red accent bar underneath.
2. **Badge**: Reusable `<Badge variant="pass" />` — passes variant as prop, applies color.
3. **Button**: `<Button variant="primary" />` — styled with brand colors.
4. **Card**: `<Card className="..." />` — white bg, border, shadow, rounded-lg.
5. **filterSort.ts**: Export pure functions:
   - `filterBySearch(data, term)` — searches partNumber, manufacturer, lotNumber, ocrText
   - `filterByStatus(data, status)` — exact match
   - `filterByManufacturer(data, mfr)` — exact match
   - `sortByConfidence(data, order)` — asc/desc
   - `getStats(data)` — returns `{ total, passCount, failCount, reviewCount }`

**Tailwind config additions:**
```js
theme: {
  extend: {
    colors: {
      primary: {
        black: '#000000',
        red: '#C83A26',
        white: '#FFFFFF',
      },
      secondary: {
        DEFAULT: '#464646',
        muted: '#9E9E9E',
      },
      status: {
        pass: '#16a34a',
        fail: '#C83A26',
        review: '#d97706',
      }
    }
  }
}
```

**Branch:** None (foundational, low risk)

**Commit message:** `feat: establish core layout, UI primitives, and utility functions`

---

### PHASE 2: Statistics Bar

**Objective:** Build the StatsBar component that displays total records and PASS/FAIL/REVIEW counts with color-coded stat cards.

**Files created/touched:**
- `src/components/StatsBar.tsx`
- `src/App.tsx` (update — add StatsBar with data)

**Implementation details:**
1. StatsBar receives `stats` object as props
2. Renders 4 stat cards in a horizontal row:
   - **Total** — neutral (secondary gray)
   - **PASS** — green accent + check icon
   - **FAIL** — red accent + x icon
   - **REVIEW** — amber accent + alert icon
3. Each card shows: icon, count number (large), label (small)
4. Responsive: 4 columns on desktop, 2x2 on mobile
5. Data is computed via `getStats()` from filterSort utility

**Branch:** None (pure addition)

**Commit message:** `feat: add statistics bar with color-coded status counts`

---

### PHASE 3: Search, Filter & Sort System

**Objective:** Build the SearchBar, FilterBar (status + manufacturer), SortControl components. Wire them up to App state so they properly filter the data.

**Files created/touched:**
- `src/components/SearchBar.tsx`
- `src/components/FilterBar.tsx`
- `src/components/SortControl.tsx`
- `src/App.tsx` (major update — add all state, useMemo derivation)

**Implementation details:**
1. **SearchBar**: Text input with magnifying glass icon (Lucide `Search`). On change → updates `searchTerm` state. Includes a small X button to clear.
2. **StatusFilter** (inside FilterBar): Button group — ALL | PASS | FAIL | REVIEW. Active button gets brand red bg.
3. **ManufacturerFilter** (inside FilterBar): `<select>` dropdown dynamically populated from `[...new Set(data.map(r => r.manufacturer))]` + "All Manufacturers" option.
4. **SortControl**: Toggle button cycling: None → Ascending → Descending. Shows arrow icons.
5. **App.tsx wiring**:
   ```typescript
   const [searchTerm, setSearchTerm] = useState('')
   const [statusFilter, setStatusFilter] = useState('ALL')
   const [manufacturerFilter, setManufacturerFilter] = useState('')
   const [sortOrder, setSortOrder] = useState('none')

   const filteredData = useMemo(() => {
     let result = data
     result = filterBySearch(result, searchTerm)
     result = filterByStatus(result, statusFilter)
     result = filterByManufacturer(result, manufacturerFilter)
     result = sortByConfidence(result, sortOrder)
     return result
   }, [searchTerm, statusFilter, manufacturerFilter, sortOrder])
   ```

**Branch:** `feature/search-filter` (core logic, worth isolating)

**Commit messages:**
- `feat: add search bar with text input and clear button`
- `feat: implement status filter with active button highlighting`
- `feat: add manufacturer filter dropdown with dynamic options`
- `feat: add confidence sort toggle (asc/desc/none)`
- `feat: wire filter state to data derivation pipeline`

---

### PHASE 4: Results Display (Cards + Empty State)

**Objective:** Build InspectionCard, InspectionList, EmptyState, StatusBadge, ImagePlaceholder, and ConfidenceBadge components. Render the filtered/sorted results as a card grid.

**Files created/touched:**
- `src/components/InspectionCard.tsx`
- `src/components/InspectionList.tsx`
- `src/components/EmptyState.tsx`
- `src/components/StatusBadge.tsx`
- `src/components/ImagePlaceholder.tsx`
- `src/components/ConfidenceBadge.tsx`
- `src/App.tsx` (update — render InspectionList)

**Implementation details:**
1. **StatusBadge**: Small pill `<span>` — green bg for PASS, red bg for FAIL, amber bg for REVIEW. White text. Capitalizes the text.
2. **ConfidenceBadge**: Shows the number. If < 80, bg-red-50 + text-red-700 with a warning icon. If >= 80, neutral gray.
3. **ImagePlaceholder**: 120x120 gray box with centered chip/IC icon (Lucide `Cpu`). Represents where component photo would be.
4. **InspectionCard**: Card layout:
   ```
   ┌──────────────────────────┐
   │ [img]  PASS      96.5%   │
   │        TDA21470AUMA1     │
   │        Infineon          │
   │        WR036002W41 · 2023 │
   └──────────────────────────┘
   ```
   - onClick → sets `selectedItem` in App → opens DetailPanel
   - Hover: subtle shadow elevation, cursor pointer
   - Transition: smooth shadow change on hover
5. **InspectionList**: CSS grid — `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`. Maps over filtered data, renders InspectionCard for each. If array is empty, renders EmptyState instead.
6. **EmptyState**: Centered column with large icon (Lucide `SearchX`), heading "No matching inspection record found.", subtext "Try adjusting your search or filters."

**Branch:** None (depends on Phase 3 but additive, safe)

**Commit messages:**
- `feat: add status badge component with color coding`
- `feat: add confidence badge with low-score highlighting`
- `feat: add image placeholder component`
- `feat: create inspection card with hover interaction`
- `feat: add empty state with icon and messaging`
- `feat: render result cards in responsive grid`

---

### PHASE 5: Detail Panel (Slide-Out Sidebar)

**Objective:** Build a slide-out DetailPanel that shows full inspection details when a card is clicked.

**Files created/touched:**
- `src/components/DetailPanel.tsx`
- `src/App.tsx` (update — manage selectedItem state, render DetailPanel)
- `src/App.css` (update — slide animation keyframes)

**Implementation details:**
1. DetailPanel slides in from the right side, overlaying main content with a semi-transparent backdrop.
2. Panel width: ~420px on desktop, full width on mobile.
3. Components inside:
   - Close button (X icon, top-right)
   - Panel header: partNumber + StatusBadge
   - ConfidenceBadge (large, prominent)
   - Section: **Barcode Text** — label + monospace text in gray code-block style
   - Section: **OCR Text** — label + text
   - Section: **Remarks** — label + text in italic/quote style
4. Backdrop click → closes panel. Close button → closes panel.
5. Animations:
   - Panel: `translate-x-0` (open) / `translate-x-full` (closed), 300ms ease
   - Backdrop: opacity transition
6. Body scroll lock when panel is open

**Interaction logic in App.tsx:**
```typescript
const [selectedItem, setSelectedItem] = useState<InspectionRecord | null>(null)

// Passed to each InspectionCard:
onClick={() => setSelectedItem(record)}

// Conditionally render:
{selectedItem && (
  <DetailPanel
    record={selectedItem}
    onClose={() => setSelectedItem(null)}
  />
)}
```

**Branch:** `feature/detail-view` (interaction with layout, worth isolating)

**Commit messages:**
- `feat: add detail panel slide-out with backdrop`
- `feat: render barcode, OCR, and remarks sections`
- `feat: wire card click to open and close detail panel`

---

### PHASE 6: Polish, Responsiveness & Documentation

**Objective:** Refine responsive behavior, add micro-interactions, write code comments, create README.

**Files created/touched:**
- `src/App.css` (update — refine transitions)
- All component files (add JSDoc comments)
- `README.md` (create)

**Implementation details:**
1. **Responsive audit:**
   - Mobile (<640px): 1-column cards, filters stack vertically, search full-width, stats 2x2
   - Tablet (640-1024px): 2-column cards, filters in a row
   - Desktop (>1024px): 3-column cards, all controls visible
2. **Micro-interactions:**
   - Button hover: slight darken
   - Card hover: shadow `shadow-md` → `shadow-lg`
   - Filter active state: brand red underline or bg
3. **Code comments:** Add JSDoc to all components explaining props and purpose.
4. **README.md:**
   - Project title + description
   - Tech stack
   - How to run: `npm install && npm run dev`
   - Color theme reference
   - Project structure tree
5. **Final visual check:** Ensure all Tailwind classes are correct, no visual glitches.

**Branch:** None (safe, additive only)

**Commit messages:**
- `style: optimize responsive layout for mobile/tablet/desktop`
- `style: add hover transitions and micro-interactions`
- `docs: add JSDoc comments to all components`
- `docs: create README with setup instructions`

---

## 7. Future Scenario Phases (Post-Test — Not Included in Current Build)

| Phase | Scenario | Why |
|-------|----------|-----|
| Future-1 | **CRUD operations** — add/edit/delete records | Full inspection lifecycle management |
| Future-2 | **Real image upload** — replace placeholders with actual component photos | Converge photographs every part |
| Future-3 | **API integration** — replace JSON file with REST calls | Real backend connectivity |
| Future-4 | **Export to CSV/PDF** — download inspection reports | Audit trail, compliance |
| Future-5 | **Advanced search** — date range, confidence range, multi-field | Production-scale filtering |
| Future-6 | **Dark mode toggle** | Operator preference in lab environments |
| Future-7 | **Pagination / virtualization** | Handle thousands of records |
| Future-8 | **Auth / login** — role-based access | Different permissions for inspectors vs engineers |
| Future-9 | **Keyboard shortcuts** — arrow keys, Esc, Ctrl+F | Lab efficiency, power users |
| Future-10 | **Comparison view** — side-by-side records | Manual review workflow |

---

## 8. Branch Strategy Summary

| Phase | Branch | Why |
|-------|--------|-----|
| 0 | None | Fresh project |
| 1 | None | Foundation, low risk |
| 2 | None | Pure addition |
| 3 | `feature/search-filter` | Core logic, worth isolating |
| 4 | None | Depends on Phase 3, additive |
| 5 | `feature/detail-view` | Layout risk (slide-out overlay) |
| 6 | None | Polish only, safe |

---

## 9. Commit Convention

```
type: description

Types:
  feat    — new feature
  fix     — bug fix
  style   — styling, visual changes
  refactor— code restructuring
  docs    — documentation
  chore   — tooling, config, dependencies
```
