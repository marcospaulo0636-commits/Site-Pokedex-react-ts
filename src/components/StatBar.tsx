import { STAT_LABELS } from '../utils/helpers'

interface StatBarProps {
  name: string
  value: number
}

const MAX_STAT = 200

export default function StatBar({ name, value }: StatBarProps) {
  const percent = Math.min((value / MAX_STAT) * 100, 100)

  return (
    <div className="stat">
      <span className="stat__label">{STAT_LABELS[name] ?? name}</span>
      <span className="stat__value">{value}</span>
      <div className="stat__track">
        <div className="stat__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
