# AGILA EYE Search — Research & Conceptualization

## What is Converge?

**Converge** (converge.com) is a global supply chain partner for electronic components, and a subsidiary of **Arrow Electronics** (NYSE: ARW). They specialize in:

- **Electronic component sourcing** — finding hard-to-fort parts
- **Excess inventory management** — matching buyers with surplus stock
- **Quality inspection & testing** — anti-counterfeit verification of ICs/components
- **Q360 Quality Process** — their proprietary 3-tier inspection methodology

They operate in 27 countries and serve industries like aerospace/defense, automotive, medical, AI, and telecom.

---

## What the Test Is Asking For

The test is a **front-end take-home exam** for a web developer position at Converge.

They want you to build **"InspectIC"** (Inspection for ICs) — an internal search/review UI that mirrors their actual real-world workflow:

### Real-World Context

When Converge receives electronic components (ICs, chips, semiconductors), they:

1. **Inspect them visually** — check labels, markings, package condition
2. **Scan barcodes** — match against manufacturer data
3. **Run OCR** — read part numbers/lot numbers from component markings
4. **Assign a status** — PASS / FAIL / REVIEW based on confidence
5. **Record remarks** — document discrepancies (e.g., "barcode says ADUM1201BRZ but OCR says ADUM1201ARZ")

**InspectIC** is meant to be a quick-lookup tool where an inspector can search historical records by part number, lot, manufacturer, or OCR text to see if a component passed inspection.

### What They're Evaluating

| Skill | How It's Tested |
|---|---|
| HTML/CSS/JS fundamentals | Build a working single-page app |
| UI/UX sense | Clean layout, responsive design |
| Search & filter logic | Real-time filtering across multiple fields |
| Attention to detail | Correct rendering of sample data |
| Bonus polish | Sorting, stats, highlights, comments, README |

### Sample Data Breakdown

The 4 sample records represent real inspection scenarios:

| ID | Scenario |
|---|---|
| 1 | **PASS** — Everything matches (label + barcode + OCR) |
| 2 | **REVIEW** — OCR marking is unclear, needs manual check |
| 3 | **FAIL** — Part number mismatch between OCR and barcode |
| 4 | **PASS** — All key fields matched |

---

## Conceptual Architecture

```
┌─────────────────────────────────────────────┐
│                  Header                      │
│        InspectIC — Inspection Search         │
├─────────────────────────────────────────────┤
│  [Search Box]  [Status ▼]  [Mfr ▼]          │
├─────────────────────────────────────────────┤
│  Stats: Total: 4  ✅ PASS: 2  ❌ FAIL: 1  ⚠️ REVIEW: 1 │
├─────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐        │
│  │ Card 1       │  │ Card 2       │        │
│  │ TDA21470AUMAI│  │ STM32F103C8T6│        │
│  │ Infineon     │  │ STMicro      │        │
│  │ PASS  96.5%  │  │ REVIEW 72.3% │        │
│  │ [Image PH]   │  │ [Image PH]   │        │
│  └──────────────┘  └──────────────┘        │
│  ┌──────────────┐  ┌──────────────┐        │
│  │ Card 3       │  │ Card 4       │        │
│  │ ...          │  │ ...          │        │
│  └──────────────┘  └──────────────┘        │
├─────────────────────────────────────────────┤
│  Detail Panel (shown on click)              │
│  Barcode: ...  OCR: ...  Remarks: ...       │
└─────────────────────────────────────────────┘
```

### Key UI Elements

1. **Search box** — filters by partNumber, manufacturer, lotNumber, ocrText
2. **Status dropdown** — PASS / FAIL / REVIEW / ALL
3. **Manufacturer dropdown** — dynamically populated from data
4. **Result cards** — each showing 6 fields + image placeholder
5. **Detail modal/panel** — triggered by clicking a card
6. **Empty state** — "No matching inspection record found."
7. **Stats bar** — total counts by status (bonus)
8. **Sort toggle** — by confidence (bonus)
9. **Color coding** — confidence < 80% highlighted (bonus)

---

## Recommended Tech Stack

Given the test allows any tech:

- **Vanilla JS + CSS** — simplest, no build step, just open index.html
- **Bootstrap 5** (CDN) — for responsive layout, cards, modals
- **Single HTML file** — everything in one file, zero dependencies

This approach:
- Works offline (no build tool needed)
- Easy to submit as a ZIP
- Shows you know fundamentals without framework boilerplate

---

## "AGILA EYE" Name Origin

- **AGILA** = likely a brand/product name (plays on "agile" / "eagle")
- **EYE** = visual inspection / "eagle eye" quality check
- Together: **AGILA EYE** = agile eagle-eye inspection tool

No direct public reference to "AGILA EYE" was found on converge.com — it's probably an internal project codename for their inspection search system.

---

## Summary

| Question | Answer |
|---|---|
| What company? | Converge (Arrow Electronics subsidiary) |
| What position? | Web Developer (front-end) |
| What to build? | InspectIC — inspection record search page |
| Real purpose? | Internal tool to look up IC inspection history |
| Key domain? | Semiconductor supply chain / quality inspection |
| Difficulty? | Intermediate — search, filter, responsive UI |
