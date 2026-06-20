interface InspecticIconProps {
  size?: number
  className?: string
}

export default function InspecticIcon({ size = 22, className }: InspecticIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <rect x="6" y="6" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="10" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 6V2M16 30V26M6 16H2M30 16H26M8 8L5 5M24 8L27 5M8 24L5 27M24 24L27 27"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
