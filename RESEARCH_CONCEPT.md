# Research & Concept Analysis: InspectIC Test Project

## About Converge (converge.com)

Converge is a **global supply chain partner** and a subsidiary of **Arrow Electronics** (NYSE: ARW). 
Founded in 1980, headquartered in Peabody, Massachusetts. They specialize in:

- **Electronic component sourcing** — finding hard-to-find ICs, semiconductors, and electronic parts
- **Excess inventory management** — helping companies sell surplus components
- **Quality inspection & testing** — their core differentiator

### Key Quality Programs

| Program | Description |
|---------|-------------|
| **Q360 Quality Process** | Their proprietary multi-tier inspection methodology based on IDEA 1010 standard |
| **Tier 1: Visual Inspection** | Incoming visual inspection & authenticity verification of all products |
| **Tier 2: Engineering Inspection** | Microscopic-level evaluation by certified component engineers |
| **Tier 3: Outbound Verification** | Final verification before shipment |

They hold certifications: ISO/IEC 17025:2017, AS6171, AS6081, AS9120, ISO 9001, and others.

---

## What They Are Testing For

The **InspectIC** take-home test is clearly modeled after **Converge's real-world Q360 inspection workflow**. 

In their labs, inspectors and quality engineers:
1. Receive incoming electronic components (ICs, semiconductors)
2. Scan **barcodes** on labels/reels
3. Use **OCR** to read markings on the parts themselves
4. Compare barcode data vs OCR data vs manufacturer specs
5. Assign a **confidence score** and **status** (PASS / FAIL / REVIEW)
6. Write **remarks** documenting discrepancies

### How the Sample Data Maps to Real Work

| Sample Field | Real-World Meaning |
|-------------|-------------------|
| `partNumber` | The IC/component model number (e.g., TDA21470AUMAI) |
| `manufacturer` | The component brand (Infineon, STMicro, etc.) |
| `lotNumber` | Manufacturing lot/batch for traceability |
| `dateCode` | Week/year the component was manufactured |
| `status: PASS/FAIL/REVIEW` | Inspection disposition — did it pass quality checks? |
| `confidence` | How confident the system is that the part is authentic |
| `barcodeText` | Data read from the barcode on the packaging/reel |
| `ocrText` | Optical character recognition of markings on the actual IC body |
| `remarks` | Inspector's notes on discrepancies found |

### Real Failure Scenario (from sample data)

The `ADUM1201ARZ` record shows:
- **OCR** reads `ADUM1201ARZ` 
- **Barcode** reads `ADUM1201BRZ` (different suffix)
- **Confidence**: 45.8% → **FAIL**
- This is a classic counterfeit/mismatch detection scenario

This is exactly the kind of thing Converge's Q360 process catches.

---

## What the "InspectIC" App Should Be

They want a **front-end search/review interface** that mirrors what an inspector or quality engineer would use to:

1. **Search** inspection records by part number, manufacturer, lot number, or OCR text
2. **Filter** by status (PASS / FAIL / REVIEW) — prioritize flagged items
3. **Filter** by manufacturer — narrow down to specific suppliers
4. **View results** as cards or a table with key fields (part, mfr, lot, date code, status, confidence, image placeholder)
5. **Drill into details** — see full barcode text, OCR text, and inspector remarks
6. **Handle empty states** — clear messaging when no matches found
7. **Bonus features** — sort by confidence, highlight low confidence (<80%), statistics dashboard

### Why These Features Matter to Converge

- **Search by OCR text**: Inspectors need to search by what was read off the part
- **Confidence score**: Low confidence = potential counterfeit = needs investigation
- **Status filter**: FAIL items need immediate attention, REVIEW items need human review
- **Detail view**: Inspectors need to compare barcode vs OCR side by side

### Tech Stack Notes

The test allows HTML/CSS/JS, Bootstrap, or React. Given that:
- No backend needed
- It's a single-page app with search, filter, sort, and detail drill-down
- The data is static JSON

**React** would be a natural fit because:
- Component-based (SearchBar, FilterBar, ResultCard, DetailPanel, StatsBar)
- State management for search/filter/sort logic
- Easy to make responsive

Bootstrap is explicitly allowed and could be used for quick responsive layout.

---

## Summary

| Aspect | Real Converge Equivalent |
|--------|------------------------|
| **InspectIC** | Internal QA tool name (fictional) |
| **Inspection records** | Q360 inspection results |
| **PASS/FAIL/REVIEW** | Inspection disposition codes |
| **Confidence score** | Authenticity confidence from barcode vs OCR matching |
| **Barcode text** | Data scanned from component packaging |
| **OCR text** | Text read from IC body markings |
| **Part number mismatch** | Common counterfeit detection pattern |

They want to see if you can build the kind of internal tool their quality engineers would actually use.
