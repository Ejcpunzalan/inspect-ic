import { useEffect } from 'react'
import { X, Barcode, ScanLine, FileText, Cpu } from 'lucide-react'
import type { InspectionRecord } from '../types'
import StatusBadge from './StatusBadge'
import ConfidenceBadge from './ConfidenceBadge'

interface DetailPanelProps {
  record: InspectionRecord | null
  onClose: () => void
}

export default function DetailPanel({ record, onClose }: DetailPanelProps) {
  useEffect(() => {
    if (!record) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [record, onClose])

  useEffect(() => {
    if (record) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [record])

  if (!record) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="flex w-full max-w-lg max-h-[90vh] flex-col rounded-xl bg-white shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-secondary-muted/20 px-6 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
              <Cpu size={20} className="text-secondary-muted" />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-primary-black">
                {record.partNumber}
              </h2>
              <p className="text-xs text-secondary-muted">ID: {record.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-secondary-muted hover:bg-gray-100 hover:text-primary-black"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div className="flex items-center gap-3">
            <StatusBadge status={record.status} />
            <ConfidenceBadge score={record.confidence} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-secondary-muted uppercase tracking-wider">
                Manufacturer
              </p>
              <p className="mt-0.5 text-sm font-medium text-primary-black">
                {record.manufacturer}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-secondary-muted uppercase tracking-wider">
                Lot Number
              </p>
              <p className="mt-0.5 text-sm font-mono text-primary-black">
                {record.lotNumber}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-secondary-muted uppercase tracking-wider">
                Date Code
              </p>
              <p className="mt-0.5 text-sm text-primary-black">{record.dateCode}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-secondary-muted">
              <Barcode size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">Barcode</span>
            </div>
            <p className="rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed text-primary-black break-all">
              {record.barcodeText}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-secondary-muted">
              <ScanLine size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">OCR</span>
            </div>
            <p className="rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-primary-black">
              {record.ocrText}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-secondary-muted">
              <FileText size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">Remarks</span>
            </div>
            <p
              className={`rounded-lg p-3 text-sm leading-relaxed ${
                record.status === 'PASS'
                  ? 'bg-status-pass/5 text-status-pass'
                  : record.status === 'FAIL'
                    ? 'bg-status-fail/5 text-status-fail'
                    : 'bg-status-review/5 text-status-review'
              }`}
            >
              {record.remarks}
            </p>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
