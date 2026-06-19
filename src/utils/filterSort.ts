import type { InspectionRecord } from '../types'

/** Filter records by search term across partNumber, manufacturer, lotNumber, and ocrText. */
export function filterBySearch(data: InspectionRecord[], term: string): InspectionRecord[] {
  if (!term.trim()) return data
  const t = term.toLowerCase()
  return data.filter(
    (r) =>
      r.partNumber.toLowerCase().includes(t) ||
      r.manufacturer.toLowerCase().includes(t) ||
      r.lotNumber.toLowerCase().includes(t) ||
      r.ocrText.toLowerCase().includes(t)
  )
}

/** Filter records by inspection status. Pass 'ALL' to disable filtering. */
export function filterByStatus(
  data: InspectionRecord[],
  status: 'ALL' | 'PASS' | 'FAIL' | 'REVIEW'
): InspectionRecord[] {
  if (status === 'ALL') return data
  return data.filter((r) => r.status === status)
}

/** Filter records by exact manufacturer name. Pass 'ALL' to disable filtering. */
export function filterByManufacturer(
  data: InspectionRecord[],
  manufacturer: string
): InspectionRecord[] {
  if (!manufacturer || manufacturer === 'ALL') return data
  return data.filter((r) => r.manufacturer === manufacturer)
}

/** Sort records by confidence score. Pass 'none' to preserve original order. */
export function sortByConfidence(
  data: InspectionRecord[],
  order: 'none' | 'asc' | 'desc'
): InspectionRecord[] {
  if (order === 'none') return data
  const sorted = [...data]
  sorted.sort((a, b) =>
    order === 'desc' ? b.confidence - a.confidence : a.confidence - b.confidence
  )
  return sorted
}

/** Derive aggregate stats (total, pass, fail, review counts) from a record set. */
export function getStats(data: InspectionRecord[]) {
  return {
    total: data.length,
    passCount: data.filter((r) => r.status === 'PASS').length,
    failCount: data.filter((r) => r.status === 'FAIL').length,
    reviewCount: data.filter((r) => r.status === 'REVIEW').length,
  }
}

/** Get alphabetically sorted list of unique manufacturers from the data set. */
export function getUniqueManufacturers(data: InspectionRecord[]): string[] {
  return [...new Set(data.map((r) => r.manufacturer))].sort()
}
