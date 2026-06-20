import type { ChatContext, RecordSummary } from './types'

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
  return `**${r.partNumber}** (${r.manufacturer}) — Status: **${r.status}**, Confidence: **${r.confidence}%**, Lot: ${r.lotNumber}, DC: ${r.dateCode}`
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

  // --- Greetings ---
  const greetingWords = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'good day']
  if (greetingWords.some((g) => q === g || q.startsWith(g + ' ') || q.startsWith(g + '!'))) {
    if (q.startsWith('good morning') || q.startsWith('good afternoon') || q.startsWith('good evening') || q.startsWith('good day')) {
      return `${timeGreeting()}! I'm your InspectIC assistant. I can help you explore inspection records — try asking about a specific part, manufacturer, or status count.`
    }
    return `${timeGreeting()}! Welcome to InspectIC. I can answer questions about inspection records, statuses, and dashboard data. What would you like to know?`
  }

  // --- Help ---
  if (q.includes('help') || q.includes('what can you') || q.includes('what do you')) {
    return `${timeGreeting()}! I can help with:\n- "Who passed?"\n- "Which one failed?"\n- "Show me the ones for review"\n- "Tell me about the Infineon part"\n- "How many passed?"\n- "Search lot A9K23"`
  }

  // --- Who/which/show status queries — return manufacturer names only ---
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
    return `Dashboard summary — **${passCount}** PASS, **${failCount}** FAIL, **${reviewCount}** REVIEW out of **${total}** total records (${pct}% pass rate).`
  }

  // --- "Tell me about <manufacturer>" or "Why did <manufacturer> fail?" ---
  const manufacturerMatch = q.match(/(?:tell me about|about|why did|what about|info on|details on|search)\s+(.+)/i)
  let searchTarget = ''
  if (manufacturerMatch) {
    searchTarget = manufacturerMatch[1].trim()
  } else {
    // Try matching known manufacturer names directly
    const knownManufacturers = [...new Set(ctx.allRecords.map((rec) => rec.manufacturer.toLowerCase()))]
    const foundMfr = knownManufacturers.find((mfr) => q.includes(mfr))
    if (foundMfr) searchTarget = foundMfr

    // Try matching known part numbers directly
    const knownParts = ctx.allRecords.map((rec) => rec.partNumber.toLowerCase())
    const foundPart = knownParts.find((pn) => q.includes(pn))
    if (foundPart) searchTarget = foundPart

    // Try matching lot numbers
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
          PASS: 'All inspection criteria were met — no issues detected.',
          FAIL: m.remarks,
          REVIEW: m.remarks,
        }
        return `**${m.partNumber}** (${m.manufacturer}) is **${m.status}**. ${reasons[m.status] || m.remarks}`
      }
      if (matches.length === 1) {
        return `Here are the details for ${formatRecord(matches[0])}`
      }
      const lines = matches.map((m) => `  • ${formatRecord(m)}`)
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
    return "No inspection record is currently selected. You can click any card to view its details, or try asking about the full dataset: \"How many passed?\" or \"Tell me about the Infineon part.\""
  }

  // --- Polite fallback ---
  return "I'm sorry, I can only provide information about the current dashboard records. How can I help you with that?"
}
