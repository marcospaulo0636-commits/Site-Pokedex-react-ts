import { TYPE_LABELS } from '../utils/helpers'

export default function TypeBadge({ type }: { type: string }) {
  return <span className={`type-badge type-${type}`}>{TYPE_LABELS[type] ?? type}</span>
}
