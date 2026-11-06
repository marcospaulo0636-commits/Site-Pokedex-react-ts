export const TYPE_LABELS: Record<string, string> = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  grass: 'Planta',
  electric: 'Elétrico',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Veneno',
  ground: 'Terra',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Aço',
  fairy: 'Fada',
}

export const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Ataque Esp.',
  'special-defense': 'Defesa Esp.',
  speed: 'Velocidade',
}

export function getIdFromUrl(url: string): string {
  const parts = url.split('/').filter(Boolean)
  return parts[parts.length - 1] ?? ''
}

export function artworkUrl(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function capitalize(text: string): string {
  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatNumber(id: number | string): string {
  return `#${String(id).padStart(4, '0')}`
}
