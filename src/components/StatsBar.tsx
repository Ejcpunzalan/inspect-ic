import { CheckCircle2, XCircle, AlertTriangle, ClipboardList } from 'lucide-react'

interface StatsBarProps {
  total: number
  passCount: number
  failCount: number
  reviewCount: number
}

interface StatCardProps {
  label: string
  count: number
  icon: React.ReactNode
  bgClass: string
  textClass: string
}

function StatCard({ label, count, icon, bgClass, textClass }: StatCardProps) {
  return (
    <div className={`flex items-center gap-3 rounded-lg p-4 ${bgClass}`}>
      <div className={`${textClass}`}>{icon}</div>
      <div>
        <p className={`text-2xl font-bold ${textClass}`}>{count}</p>
        <p className="text-xs text-secondary">{label}</p>
      </div>
    </div>
  )
}

export default function StatsBar({ total, passCount, failCount, reviewCount }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        label="Total Records"
        count={total}
        icon={<ClipboardList size={24} />}
        bgClass="bg-gray-50"
        textClass="text-primary-black"
      />
      <StatCard
        label="PASS"
        count={passCount}
        icon={<CheckCircle2 size={24} />}
        bgClass="bg-green-50"
        textClass="text-status-pass"
      />
      <StatCard
        label="FAIL"
        count={failCount}
        icon={<XCircle size={24} />}
        bgClass="bg-red-50"
        textClass="text-status-fail"
      />
      <StatCard
        label="REVIEW"
        count={reviewCount}
        icon={<AlertTriangle size={24} />}
        bgClass="bg-amber-50"
        textClass="text-status-review"
      />
    </div>
  )
}
