import type { ChatContext, RecordSummary } from './types'

const MANUFACTURING_DATA = [
  { id: 1, partNumber: 'TDA21470AUMA1', manufacturer: 'Infineon', lotNumber: 'WR036002W41', dateCode: '2023', status: 'PASS', confidence: 96.5, barcodeText: '[06X988289961TWR036002W419D2023Q50001PTDA21470AUMA1', ocrText: 'INFINEON TDA21470AUMA1 DC2023 LOT WR036002W41', remarks: 'Label and barcode matched.' },
  { id: 2, partNumber: 'STM32F103C8T6', manufacturer: 'STMicroelectronics', lotNumber: 'A9K23', dateCode: '2022', status: 'REVIEW', confidence: 72.3, barcodeText: 'P:STM32F103C8T6;LOT:A9K23;DC:2022', ocrText: 'STM32F103C8T6 marking partially unclear', remarks: 'OCR confidence is low. Manual review required.' },
  { id: 3, partNumber: 'ADUM1201ARZ', manufacturer: 'Analog Devices', lotNumber: 'LTC8842', dateCode: '2024', status: 'FAIL', confidence: 45.8, barcodeText: 'IP ADUM1201BRZ IT LTC8842 9D 2024', ocrText: 'ADUM1201ARZ but barcode indicates ADUM1201BRZ', remarks: 'Part number mismatch between OCR and barcode.' },
  { id: 4, partNumber: 'TPS54331DR', manufacturer: 'Texas Instruments', lotNumber: 'T155391', dateCode: '2021', status: 'PASS', confidence: 91.2, barcodeText: 'P TPS54331DR Q 2500 IT T155391 D 2021', ocrText: 'TI TPS54331DR 2021', remarks: 'All key fields matched.' },
]

function bold(pn: string): string {
  return `**${pn}**`
}

function statusWarning(status: string): string {
  return status === 'FAIL' || status === 'REVIEW' ? ' \u26A0\uFE0F Please check the remarks for this item.' : ''
}

function manufacturingReply(input: string): string | null {
  const q = input.toLowerCase().trim()

  if ((q.includes('about') || q.includes('manufactured')) && (q.includes('part') || q.includes('batch') || q.includes('data') || q.includes('item'))) {
    const lines = MANUFACTURING_DATA.map(
      (d) =>
        `\u2022 ${bold(d.partNumber)} \u2014 ${d.manufacturer}, Status: ${d.status}, Confidence: ${d.confidence}%${statusWarning(d.status)}`
    )
    return `Here is the full summary of our manufacturing batch:\n${lines.join('\n')}`
  }

  if ((q.includes('how many') || q.includes('count')) && (q.includes('part') || q.includes('batch') || q.includes('item'))) {
    return 'We currently have 4 parts in our manufacturing batch.'
  }

  const targetStatus: 'PASS' | 'FAIL' | 'REVIEW' | null =
    q.includes('passed') && !q.includes('failed') ? 'PASS'
    : q.includes('failed') && !q.includes('passed') ? 'FAIL'
    : q.includes('review') ? 'REVIEW'
    : null
  if (targetStatus && (q.includes('status') || q.includes('who') || q.includes('what') || q.includes('which') || q.includes('show') || q.includes('list'))) {
    const filtered = MANUFACTURING_DATA.filter((d) => d.status === targetStatus)
    if (filtered.length === 0) return `No items have a status of ${targetStatus}.`
    const lines = filtered.map(
      (d) => `\u2022 ${bold(d.partNumber)} \u2014 ${d.manufacturer}, Confidence: ${d.confidence}%${statusWarning(d.status)}`
    )
    return `Items with status ${targetStatus}:\n${lines.join('\n')}`
  }

  if (q.includes('highest') || q.includes('lowest')) {
    const sorted = [...MANUFACTURING_DATA].sort((a, b) => b.confidence - a.confidence)
    if (q.includes('highest')) {
      const h = sorted[0]
      return `The highest confidence is ${bold(h.partNumber)} at ${h.confidence}%.${statusWarning(h.status)}`
    }
    const l = sorted[sorted.length - 1]
    return `The lowest confidence is ${bold(l.partNumber)} at ${l.confidence}%.${statusWarning(l.status)}`
  }

  if (q.includes('help')) {
    return 'You can ask me about: Part status, Batch summary, Confidence levels, or details of a specific part.'
  }

  return null
}

function timeGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function findRecordsMatching(ctx: ChatContext, keywords: string[]): RecordSummary[] {
  const hits: RecordSummary[] = []
  const lower = keywords.map((k) => k.toLowerCase())

  for (const rec of ctx.allRecords) {
    const haystack = [rec.partNumber, rec.manufacturer, rec.lotNumber, rec.ocrText, rec.remarks].join(' ').toLowerCase()
    const match = lower.some((k) => haystack.includes(k))
    if (match) hits.push(rec)
  }
  return hits
}

function formatRecord(r: RecordSummary): string {
  return `**${r.partNumber}** (${r.manufacturer}) \u2014 Status: **${r.status}**, Confidence: **${r.confidence}%**, Lot: ${r.lotNumber}, DC: ${r.dateCode}`
}

function statusFromQuery(q: string): 'PASS' | 'FAIL' | 'REVIEW' | null {
  if (q.includes('pass')) return 'PASS'
  if (q.includes('fail')) return 'FAIL'
  if (q.includes('review')) return 'REVIEW'
  return null
}

function manufacturersByStatus(ctx: ChatContext, targetStatus: string): string[] {
  return ctx.allRecords
    .filter((rec) => rec.status === targetStatus)
    .map((rec) => rec.manufacturer)
}

export function getReply(input: string, ctx: ChatContext): string {
  const q = input.toLowerCase().trim()
  const r = ctx.selectedRecord

  // --- Manufacturing data queries ---
  const mfg = manufacturingReply(input)
  if (mfg) return mfg

  // --- Greetings ---
  const greetingWords = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'good day']
  if (greetingWords.some((g) => q === g || q.startsWith(g + ' ') || q.startsWith(g + '!'))) {
    if (q.startsWith('good morning') || q.startsWith('good afternoon') || q.startsWith('good evening') || q.startsWith('good day')) {
      return `${timeGreeting()}! I'm your InspectIC assistant. I can help you explore inspection records \u2014 try asking about a specific part, manufacturer, or status count.`
    }
    return `${timeGreeting()}! Welcome to InspectIC. I can answer questions about inspection records, statuses, and dashboard data. What would you like to know?`
  }

  // --- Help ---
  if (q.includes('help') || q.includes('what can you') || q.includes('what do you')) {
    return `${timeGreeting()}! I can help with:\n- "Who passed?"\n- "Which one failed?"\n- "Show me the ones for review"\n- "Tell me about the Infineon part"\n- "How many passed?"\n- "Search lot A9K23"`
  }

  // --- Who/which/show status queries ---
  const isWhoWhatShow = /^(who|which|show|what|list|find|get)\b/.test(q)
  const targetStatus = statusFromQuery(q)
  if (isWhoWhatShow && targetStatus) {
    const mfrs = manufacturersByStatus(ctx, targetStatus)
    if (mfrs.length === 0) return `No records have a status of **${targetStatus}**.`
    if (targetStatus === 'PASS') {
      if (mfrs.length === 1) return `The part from **${mfrs[0]}** passed.`
      const last = mfrs.pop()
      return `The parts from ${mfrs.map((m) => `**${m}**`).join(', ')} and **${last}** passed.`
    }
    if (targetStatus === 'FAIL') {
      return `The part from **${mfrs[0]}** failed.`
    }
    if (targetStatus === 'REVIEW') {
      return `The part from **${mfrs[0]}** is currently for review.`
    }
  }

  // --- Status counting across all records ---
  if ((q.includes('how many') || q.includes('count')) && (q.includes('pass') || q.includes('fail') || q.includes('review'))) {
    const { passCount, failCount, reviewCount, total } = ctx.allStats
    if (q.includes('pass')) return `Across all **${total}** records, **${passCount}** passed.`
    if (q.includes('fail')) return `Across all **${total}** records, **${failCount}** failed.`
    if (q.includes('review')) return `Across all **${total}** records, **${reviewCount}** are under review.`
  }

  // --- General status overview ---
  if ((q.includes('status') && (q.includes('all') || q.includes('overall') || q.includes('dashboard'))) || q === 'status') {
    const { passCount, failCount, reviewCount, total } = ctx.allStats
    const pct = total > 0 ? Math.round((passCount / total) * 100) : 0
    return `Dashboard summary \u2014 **${passCount}** PASS, **${failCount}** FAIL, **${reviewCount}** REVIEW out of **${total}** total records (${pct}% pass rate).`
  }

  // --- Manufacturer / part number matching ---
  const manufacturerMatch = q.match(/(?:tell me about|about|why did|what about|info on|details on|search)\s+(.+)/i)
  let searchTarget = ''
  if (manufacturerMatch) {
    searchTarget = manufacturerMatch[1].trim()
  } else {
    const knownManufacturers = [...new Set(ctx.allRecords.map((rec) => rec.manufacturer.toLowerCase()))]
    const foundMfr = knownManufacturers.find((mfr) => q.includes(mfr))
    if (foundMfr) searchTarget = foundMfr

    const knownParts = ctx.allRecords.map((rec) => rec.partNumber.toLowerCase())
    const foundPart = knownParts.find((pn) => q.includes(pn))
    if (foundPart) searchTarget = foundPart

    const knownLots = ctx.allRecords.map((rec) => rec.lotNumber.toLowerCase())
    const foundLot = knownLots.find((lot) => q.includes(lot))
    if (foundLot) searchTarget = foundLot
  }

  if (searchTarget) {
    const keywords = searchTarget.split(/\s+/)
    const matches = findRecordsMatching(ctx, keywords)

    if (matches.length > 0) {
      const includesWhy = q.includes('why') || q.includes('reason') || q.includes('tell me why')
      if (includesWhy && matches.length === 1) {
        const m = matches[0]
        const reasons: Record<string, string> = {
          PASS: 'All inspection criteria were met \u2014 no issues detected.',
          FAIL: m.remarks,
          REVIEW: m.remarks,
        }
        return `**${m.partNumber}** (${m.manufacturer}) is **${m.status}**. ${reasons[m.status] || m.remarks}`
      }
      if (matches.length === 1) {
        return `Here are the details for ${formatRecord(matches[0])}`
      }
      const lines = matches.map((m) => `  \u2022 ${formatRecord(m)}`)
      return `I found **${matches.length}** matching records:\n${lines.join('\n')}`
    }
  }

  // --- Selected record queries ---
  if (r) {
    if (q.includes('part number') || q.includes('what part') || q.includes('which part') || q.includes('part#')) {
      return `The selected part is **${r.partNumber}** (ID: ${r.id}).`
    }
    if (q.includes('manufacturer') || q.includes('who made') || q.includes('brand') || q.includes('supplier')) {
      return `It was manufactured by **${r.manufacturer}**.`
    }
    if (q.includes('lot') || q.includes('batch')) {
      return `The lot number is **${r.lotNumber}** with date code **${r.dateCode}**.`
    }
    if (q.includes('status') || q.includes('pass') || q.includes('fail') || q.includes('review')) {
      return `The inspection status is **${r.status}**.`
    }
    if (q.includes('confidence') || q.includes('how sure') || q.includes('score')) {
      return `The AI confidence score is **${r.confidence}%**.`
    }
    if (q.includes('why') || q.includes('reason') || q.includes('remark') || q.includes('note') || q.includes('comment')) {
      return `Remarks: _${r.remarks}_`
    }
    if (q.includes('barcode')) {
      return `The barcode reads: \`${r.barcodeText}\``
    }
    if (q.includes('ocr') || q.includes('read') || q.includes('scan')) {
      return `OCR text: _${r.ocrText}_`
    }
  }

  // --- No selected record fallback ---
  if (!r && !q.includes('dashboard') && !q.includes('stat') && !q.includes('total') && !q.includes('overview') && !q.includes('all') && !q.includes('help')) {
    return 'No inspection record is currently selected. You can click any card to view its details, or try asking about the full dataset: "How many passed?" or "Tell me about the Infineon part."'
  }

  // --- Honesty filter fallback ---
  return 'I apologize, but I don\'t have information on that. My knowledge is limited to our website\'s current manufacturing data. I can assist you with part status, details, and summaries of our parts. What would you like to know about our current data?'
}

export async function askAI(userMessage: string, _knowledgeBase: string): Promise<string> {
  const r = manufacturingReply(userMessage)
  if (r) return r

  const q = userMessage.toLowerCase().trim()
  const greetingWords = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'good day']
  if (greetingWords.some((g) => q === g || q.startsWith(g + ' ') || q.startsWith(g + '!'))) {
    return 'Hello! I am ready to assist. You can ask me about manufacturing data, performance percentages, or request a review.'
  }

  return 'I apologize, but I don\'t have information on that. My knowledge is limited to our website\'s current manufacturing data. I can assist you with part status, details, and summaries of our parts. What would you like to know about our current data?'
}
