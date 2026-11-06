import { useEffect, useRef } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // foca o campo de busca assim que a página abre
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="search">
      <input
        ref={inputRef}
        type="search"
        placeholder="Buscar por nome ou número..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar Pokémon"
      />
      {value && (
        <button className="search__clear" onClick={handleClear} aria-label="Limpar busca">
          ✕
        </button>
      )}
    </div>
  )
}
