# Research & Conceptualization: InspectIC Web App

## What is Converge?

Converge (https://www.converge.com/) is a **global electronic component distributor and supply chain partner**, and a subsidiary of **Arrow Electronics** (NYSE: ARW). They specialize in:

- **Electronic component sourcing** — finding hard-to-find ICs, semiconductors, etc.
- **Excess inventory management** — buying/selling surplus electronic components
- **Inspection & testing** — a massive part of their business; they run a **Q360 quality program** with a 3-tier inspection methodology to detect counterfeit components
- **Obsolescence management** — helping clients manage end-of-life components

Their inspection lab in Peabody, MA is a state-of-the-art facility where degreed component quality engineers perform visual inspection, microscopic analysis, barcode/OCR verification, and counterfeit detection on electronic components (ICs, transistors, etc.).

## What "InspectIC" Is

**InspectIC** is clearly a fictional internal tool name that Converge would use in their **quality/inspection lab**. The name breaks down as:

- **Inspect** ? inspection/quality check
- **IC** ? Integrated Circuit (the electronic components they inspect)

It's an **internal search and review platform** that their quality engineers and inspectors would use to:

1. Look up inspection records by part number, manufacturer, lot number, or OCR text
2. Filter results by inspection status (PASS, FAIL, REVIEW)
3. View details of each inspection — barcode text, OCR text, remarks
4. See confidence scores to determine how reliable the inspection was
5. View image placeholders of the component (they photograph every part)

## What They Want You to Build

A **single-page application (SPA)** — no backend, no database. Just a front-end using the provided sample JSON data. This is a **take-home coding test** for a web developer position at Converge.

### Real-World Analogy

In Converge's actual lab workflow:
1. Parts arrive at the warehouse
2. Inspectors visually examine them
3. Barcode scanners read labels
4. OCR cameras capture text markings on chips
5. Engineers log results (PASS/FAIL/REVIEW) with confidence scores
6. Everything is photographed for traceability

**InspectIC** is the digital interface where they'd search all these records.

### The Sample Data Explained

The 4 sample records represent real inspection scenarios:

- **ID 1 - PASS (96.5%)** — Everything matches: label, barcode, OCR all consistent (Infineon TDA21470AUMA1)
- **ID 2 - REVIEW (72.3%)** — OCR text is unclear, marking partially unreadable — needs human review (STMicroelectronics STM32F103C8T6)
- **ID 3 - FAIL (45.8%)** — Part number mismatch! OCR says ADUM1201ARZ but barcode says ADUM1201BRZ — different model (Analog Devices)
- **ID 4 - PASS (91.2%)** — All fields matched — clean inspection (Texas Instruments TPS54331DR)

### Required Features (What They're Testing)

1. **Search box** — Can you build functional search across multiple fields? Tests JS skills.
2. **Status filter** — Can you handle filter state management? Tests UI logic.
3. **Manufacturer filter** — Dynamic filter population from data? Tests DOM manipulation.
4. **Card/Table display** — Can you render dynamic data nicely? Tests HTML/CSS.
5. **Detail view on click** — Can you handle user interaction and show more info? Tests UX.
6. **Empty result message** — Do you handle edge cases gracefully? Tests attention to detail.
7. **Responsive design** — Is it usable on desktop? Tests CSS skills.

### Bonus Features (Extra Points)

1. Sort by confidence score
2. Highlight low confidence (<80%) in red/orange
3. Statistics area (total, PASS, FAIL, REVIEW counts)
4. Clean code comments
5. README explaining how to run

## Suggested Tech Stack

Given the test allows HTML/CSS/JS, Bootstrap, or React:

- **Vanilla HTML/CSS/JS** — Simplest, no build tools, just open in browser
- A single index.html with embedded <style> and <script> is the cleanest delivery

## Suggested File Structure (for submission)

`
inspectic/
+-- index.html          # Single-page app (HTML + CSS + JS)
+-- README.md           # How to run (just open index.html in browser)
`

## How to "Run" It

No backend needed. **Just open index.html in any browser.** The sample data is hardcoded as a JS array.

---

*Research conducted June 2026 based on Converge's website and test instructions.*
