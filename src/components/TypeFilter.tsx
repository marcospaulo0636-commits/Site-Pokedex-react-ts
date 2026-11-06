import { TYPE_LABELS } from '../utils/helpers'

interface TypeFilterProps {
  value: string
  onChange: (type: string) => void
}

export default function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filtrar por tipo"
    >
      <option value="">Todos os tipos</option>
      {Object.entries(TYPE_LABELS).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  )
}
