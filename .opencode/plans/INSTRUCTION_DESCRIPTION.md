# Instruction and Description — InspectIC Web App

---

## 1. Original Test Instructions (as provided)

**Title:** Web Developer Take-Home Test: AGILA EYE Search Page

**Objective:** Create a simple one-page web application for an internal inspection/search system named **InspectIC**. The page should allow the user to search and review inspection records using sample data.

**Allowed Tech:** HTML, CSS, JavaScript, Bootstrap, React, or any preferred technology. No backend or database required.

**Scenario:** InspectIC is an internal inspection/search platform used to search IC labels, device images, manufacturer data, barcode/OCR information, and inspection status.

**Required features:**
1. Search box (by part number, manufacturer, lot number, or OCR text)
2. Status filter (PASS, FAIL, REVIEW, or ALL)
3. Manufacturer filter
4. Result display as cards or table (part number, manufacturer, lot number, date code, inspection status, confidence score, image placeholder)
5. Detail view on click (barcode text, OCR text, remarks)
6. Empty result message
7. Responsive design

**Bonus features:**
1. Sort by confidence score
2. Highlight low confidence (<80%)
3. Statistics area (total, PASS count, FAIL count, REVIEW count)
4. Clean code comments
5. README file

**Sample data provided:** 4 inspection records with fields: id, partNumber, manufacturer, lotNumber, dateCode, status, confidence, barcodeText, ocrText, remarks.

---

## 2. Research Questions & Answers

### Q1: What kind of company is Converge?

**A:** Converge (https://www.converge.com/) is a **global electronic component distributor and supply chain partner** and a wholly-owned subsidiary of **Arrow Electronics** (NYSE: ARW), a Fortune ~154 company with $27.9B in 2024 sales.

Their core business involves:
- **Electronic component sourcing** — locating hard-to-find ICs, semiconductors, and electronic parts for manufacturers
- **Excess inventory management** — buying back and reselling surplus inventory from OEMs/CMs
- **Inspection & testing** — operating a state-of-the-art quality lab in Peabody, MA that performs counterfeit detection and authenticity verification on electronic components
- **Obsolescence management** — helping clients manage end-of-life components

They hold multiple industry certifications including ISO/IEC 17025:2017, AS6171, AS6081, AS9120, ISO 9001, and ANSI ESD S20.20.

### Q2: What is the "InspectIC" system they want built?

**A:** InspectIC is a **fictional internal tool name** created specifically for this coding test. It is not a real product. The name breaks down as:
- **Inspect** → the inspection/quality verification process
- **IC** → Integrated Circuit (the electronic components they inspect)

It represents the kind of **internal search and review interface** Converge's quality engineers and inspectors would use to look up inspection records, search by part numbers/barcodes/OCR text, view inspection results (PASS/FAIL/REVIEW), check confidence scores, and see detailed evidence (barcode scans, OCR readings, inspector remarks).

### Q3: How does this relate to Converge's real business?

**A:** Directly. Converge runs a Q360 quality management program with a 3-tier inspection methodology:

1. **Incoming visual inspection** — authenticity verification of all incoming product, checking labels, markings, barcodes
2. **Engineering inspection** — microscopic-level evaluation using X-ray, SEM-EDS, C-SAM, solderability testing, etc.
3. **Outbound verification** — final check before shipping, including photography and weighing

In this workflow, inspectors:
- Scan barcodes on component labels
- Use OCR cameras to read engraved markings on ICs
- Cross-reference part numbers, date codes, lot codes
- Log a PASS/FAIL/REVIEW result with a confidence score
- Photograph every component for traceability

**InspectIC is the hypothetical software interface for managing all this data.**

### Q4: Are the sample parts real?

**A:** Yes. All 4 part numbers are real electronic components from major manufacturers:
- **TDA21470AUMA1** — Infineon (integrated power stage)
- **STM32F103C8T6** — STMicroelectronics (ARM Cortex-M3 microcontroller, very well-known)
- **ADUM1201ARZ** — Analog Devices (digital isolator; BRZ variant is a different speed grade)
- **TPS54331DR** — Texas Instruments (DC/DC buck converter)

### Q5: What do the 4 sample records represent?

**A:** Each record represents a real-world inspection scenario:

| ID | Part | Result | Why |
|----|------|--------|-----|
| 1 | Infineon TDA21470AUMA1 | **PASS** (96.5%) | Label, barcode, and OCR all consistent |
| 2 | STM STM32F103C8T6 | **REVIEW** (72.3%) | OCR marking partially unclear, needs human review |
| 3 | Analog Devices ADUM1201ARZ | **FAIL** (45.8%) | OCR reads ARZ but barcode says BRZ — part number mismatch, different model |
| 4 | TI TPS54331DR | **PASS** (91.2%) | All key fields matched |

### Q6: What tech stack should be used?

**A:** The simplest and safest choice is **vanilla HTML/CSS/JS in a single `index.html` file**. No build tools, no npm, no server. Just open in a browser. This avoids any environment issues and demonstrates strong fundamentals.

A single file structure:
```
inspectic/
├── index.html    # All HTML, CSS, and JS in one file
└── README.md     # Instructions: "Open index.html in any browser"
```

### Q7: What skills is the test evaluating?

| Skill Area | Evaluation Method |
|------------|------------------|
| JavaScript fundamentals | Search across multiple fields, filter logic, sort, data aggregation for statistics |
| DOM manipulation | Dynamically rendering cards, detail panel, updating on filter/sort changes |
| HTML/CSS | Semantic markup, responsive layout, clean visual design |
| Edge case handling | Empty state when no results match |
| UI/UX judgment | Low confidence highlighting, intuitive detail view, statistics summary |
| Professionalism | Code comments, README documentation, file organization |

---

## 3. Company Profile: Converge

| Attribute | Detail |
|-----------|--------|
| **Parent company** | Arrow Electronics (NYSE: ARW), Fortune ~154 |
| **2024 revenue** | $27.9B (Arrow consolidated) |
| **Headquarters** | Peabody, Massachusetts, USA |
| **Global presence** | Locations worldwide |
| **Core verticals** | Aerospace & Defense, Medical, Automotive, AI/Cloud, Industrial, Telecom |
| **Key quality programs** | Q360 (3-tier inspection), IDEA 1010, AS6171 counterfeit detection |
| **Proprietary systems** | Q-Trade CRM, GVS (Global Visibility System), MPR (7M+ parts database), AutoMatch, CVS |
| **Hires frontend devs?** | Yes — Angular, React, Next.js positions posted globally |

---

## 4. System Concept: InspectIC

**InspectIC** = **Inspect** (inspection/quality verification) + **IC** (Integrated Circuit)

This is an **internal-facing single-page application** for quality control engineers and inspectors at Converge to search, filter, sort, and review inspection records of electronic components.

**User flow:**
1. Inspector or engineer opens the page
2. They can search by part number (e.g., "STM32"), manufacturer ("Infineon"), lot number ("WR0360"), or OCR text
3. They can filter by status (show only FAIL items, or only REVIEW items)
4. They can filter by manufacturer (show only Texas Instruments parts)
5. Results appear as cards showing key info with color-coded status badges
6. Clicking a card opens a detail panel showing the full barcode text, OCR text, and inspector remarks
7. Low-confidence results (<80%) are highlighted for attention
8. A stats bar at the top shows total records, PASS count, FAIL count, REVIEW count
9. If no results match, a friendly empty state message is shown

**It is NOT:**
- A real-time system (no backend/API)
- A database-driven app (data is hardcoded)
- A multi-page site (single page only)
- An e-commerce or customer-facing site (internal tool)

---

*Research conducted June 2026. Sources: converge.com, Arrow Electronics corporate data, industry standards documentation.*
