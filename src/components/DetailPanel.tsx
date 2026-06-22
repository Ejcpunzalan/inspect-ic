import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Barcode, ScanLine, FileText } from 'lucide-react'
import type { InspectionRecord } from '../types'
import AnimatedStatusBadge from './AnimatedStatusBadge'
import ConfidenceBadge from './ConfidenceBadge'
import InspecticIcon from './InspecticIcon'
import BarcodeImage from './BarcodeImage'

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

  return (
    <AnimatePresence>
      {record && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="flex w-full max-w-lg max-h-[90vh] flex-col rounded-[20px] bg-black/80 backdrop-blur-xl border border-white/[0.10] shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-primary-red shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
                    <InspecticIcon size={16} className="text-primary-white/50" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-white">
                      {record.partNumber}
                    </h2>
                    <p className="text-[11px] text-white/40">Record #{record.id}</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="shrink-0 rounded-[8px] p-1.5 text-white/40 hover:bg-white/[0.06] hover:text-white/70 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <div className="flex items-center gap-3">
                  <AnimatedStatusBadge status={record.status} />
                  <ConfidenceBadge score={record.confidence} status={record.status} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                      Manufacturer
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {record.manufacturer}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                      Lot
                    </p>
                    <p className="mt-1 text-sm font-mono text-white">
                      {record.lotNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                      Date Code
                    </p>
                    <p className="mt-1 text-sm text-white">{record.dateCode}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-white/40">
                    <Barcode size={14} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Barcode</span>
                  </div>
                  <div className="rounded-[12px] bg-white/[0.04] p-3 border border-white/[0.05] overflow-x-auto">
                    <BarcodeImage text={record.barcodeText} />
                    <p className="mt-2 text-[11px] font-mono text-white/50 text-center tracking-wider">
                      {record.barcodeText}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-white/40">
                    <ScanLine size={14} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">OCR</span>
                  </div>
                  <div className="rounded-[12px] bg-white/[0.04] p-3 text-sm leading-relaxed text-white/80 border border-white/[0.05]">
                    {record.ocrText}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-white/40">
                    <FileText size={14} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Remarks</span>
                  </div>
                  <div
                    className={`rounded-[12px] p-3 text-sm leading-relaxed border ${
                      record.status === 'PASS'
                        ? 'bg-status-pass/[0.06] text-status-pass border-status-pass/15'
                        : record.status === 'FAIL'
                          ? 'bg-status-fail/[0.06] text-status-fail border-status-fail/15'
                          : 'bg-status-review/[0.06] text-status-review border-status-review/15'
                    }`}
                  >
                    {record.remarks}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </>
      )}
    </AnimatePresence>
  )
}
