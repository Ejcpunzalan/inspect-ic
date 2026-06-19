import type { InspectionRecord } from '../types'

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

export function filterByStatus(
  data: InspectionRecord[],
  status: 'ALL' | 'PASS' | 'FAIL' | 'REVIEW'
): InspectionRecord[] {
  if (status === 'ALL') return data
  return data.filter((r) => r.status === status)
}

export function filterByManufacturer(
  data: InspectionRecord[],
  manufacturer: string
): InspectionRecord[] {
  if (!manufacturer || manufacturer === 'ALL') return data
  return data.filter((r) => r.manufacturer === manufacturer)
}

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

export function getStats(data: InspectionRecord[]) {
  return {
    total: data.length,
    passCount: data.filter((r) => r.status === 'PASS').length,
    failCount: data.filter((r) => r.status === 'FAIL').length,
    reviewCount: data.filter((r) => r.status === 'REVIEW').length,
  }
}

export function getUniqueManufacturers(data: InspectionRecord[]): string[] {
  return [...new Set(data.map((r) => r.manufacturer))].sort()
}
