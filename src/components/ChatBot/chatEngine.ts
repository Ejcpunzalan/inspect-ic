import type { ChatContext } from './types'

const MANUFACTURING_DATA = [
  { id: 1, partNumber: 'TDA21470AUMA1', manufacturer: 'Infineon', lotNumber: 'WR036002W41', dateCode: '2023', status: 'PASS', confidence: 96.5, barcodeText: '[06X988289961TWR036002W419D2023Q50001PTDA21470AUMA1', ocrText: 'INFINEON TDA21470AUMA1 DC2023 LOT WR036002W41', remarks: 'Label and barcode matched.' },
  { id: 2, partNumber: 'STM32F103C8T6', manufacturer: 'STMicroelectronics', lotNumber: 'A9K23', dateCode: '2022', status: 'REVIEW', confidence: 72.3, barcodeText: 'P:STM32F103C8T6;LOT:A9K23;DC:2022', ocrText: 'STM32F103C8T6 marking partially unclear', remarks: 'OCR confidence is low. Manual review required.' },
  { id: 3, partNumber: 'ADUM1201ARZ', manufacturer: 'Analog Devices', lotNumber: 'LTC8842', dateCode: '2024', status: 'FAIL', confidence: 45.8, barcodeText: 'IP ADUM1201BRZ IT LTC8842 9D 2024', ocrText: 'ADUM1201ARZ but barcode indicates ADUM1201BRZ', remarks: 'Part number mismatch between OCR and barcode.' },
  { id: 4, partNumber: 'TPS54331DR', manufacturer: 'Texas Instruments', lotNumber: 'T155391', dateCode: '2021', status: 'PASS', confidence: 91.2, barcodeText: 'P TPS54331DR Q 2500 IT T155391 D 2021', ocrText: 'TI TPS54331DR 2021', remarks: 'All key fields matched.' },
]

function staticReply(input: string): string {
  const q = input.toLowerCase().trim()

  const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening']
  if (greetings.some((g) => q === g || q.startsWith(g + ' ') || q.startsWith(g + '!'))) {
    return 'Hello! I am ready to assist. You can ask me about manufacturing data, performance percentages, or request a review.'
  }

  if ((q.includes('info') || q.includes('give')) && q.includes('manufactured') && q.includes('parts')) {
    const lines = MANUFACTURING_DATA.map(
      (d) => `  \u2022 ${d.partNumber} \u2014 Manufacturer: ${d.manufacturer}, Status: ${d.status}`
    )
    return `Here are the manufactured parts:\n${lines.join('\n')}`
  }

  const knownManufacturers = MANUFACTURING_DATA.map((d) => d.manufacturer.toLowerCase())
  const matchedMfr = knownManufacturers.find((mfr) => q.includes(mfr))
  if (matchedMfr && (q.includes('details') || q.includes('what about') || q.includes('info') || q.includes('tell') || q.includes('find'))) {
    const item = MANUFACTURING_DATA.find((d) => d.manufacturer.toLowerCase() === matchedMfr)
    if (item) {
      return (
        `Details for ${item.manufacturer}:\n` +
        `  \u2022 ID: ${item.id}\n` +
        `  \u2022 Part Number: ${item.partNumber}\n` +
        `  \u2022 Lot: ${item.lotNumber}\n` +
        `  \u2022 Date: ${item.dateCode}\n` +
        `  \u2022 Status: ${item.status}\n` +
        `  \u2022 Confidence: ${item.confidence}%\n` +
        `  \u2022 Barcode: ${item.barcodeText}\n` +
        `  \u2022 OCR: ${item.ocrText}\n` +
        `  \u2022 Remarks: ${item.remarks}`
      )
    }
  }

  const targetStatus: 'PASS' | 'FAIL' | 'REVIEW' | null =
    q.includes('pass') ? 'PASS' : q.includes('fail') ? 'FAIL' : q.includes('review') ? 'REVIEW' : null
  const isStatusQuery = /^(who|what|which|show|list)\b/.test(q) && targetStatus
  if (isStatusQuery) {
    const filtered = MANUFACTURING_DATA.filter((d) => d.status === targetStatus)
    if (filtered.length === 0) return `No items have a status of ${targetStatus}.`
    const lines = filtered.map((d) => `  \u2022 ${d.partNumber} (${d.manufacturer})`)
    return `Items with status ${targetStatus}:\n${lines.join('\n')}`
  }

  if (q.includes('how many') && q.includes('percent')) {
    const lines = MANUFACTURING_DATA.map((d) => `  \u2022 ${d.partNumber}: ${d.confidence}%`)
    return `Confidence scores:\n${lines.join('\n')}`
  }

  if (q.includes('highest') || q.includes('lowest')) {
    const sorted = [...MANUFACTURING_DATA].sort((a, b) => b.confidence - a.confidence)
    const highest = sorted[0]
    const lowest = sorted[sorted.length - 1]
    return `Highest confidence: ${highest.partNumber} at ${highest.confidence}%.\nLowest confidence: ${lowest.partNumber} at ${lowest.confidence}%.`
  }

  if (q.includes('review') || q.includes('analysis') || q.includes('overview') || q.includes('summary')) {
    const pass = MANUFACTURING_DATA.filter((d) => d.status === 'PASS').length
    const fail = MANUFACTURING_DATA.filter((d) => d.status === 'FAIL').length
    const review = MANUFACTURING_DATA.filter((d) => d.status === 'REVIEW').length
    const avg = Math.round(MANUFACTURING_DATA.reduce((s, d) => s + d.confidence, 0) / MANUFACTURING_DATA.length)
    return `We have ${pass} PASS, ${fail} FAIL, and ${review} REVIEW items. Total average confidence is ${avg}%.`
  }

  return 'I only have access to the current manufacturing batch data. Please ask about part numbers, status, or confidence levels.'
}

export function getReply(input: string, _ctx: ChatContext): string {
  return staticReply(input)
}

export async function askAI(userMessage: string, _knowledgeBase: string): Promise<string> {
  return staticReply(userMessage)
}
