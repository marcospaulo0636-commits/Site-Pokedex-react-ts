export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  results: PokemonListItem[]
}

export interface PokemonStat {
  base_stat: number
  stat: { name: string }
}

export interface PokemonType {
  slot: number
  type: { name: string }
}

export interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonType[]
  stats: PokemonStat[]
  abilities: { ability: { name: string } }[]
  sprites: {
    front_default: string | null
    other?: {
      'official-artwork'?: { front_default: string | null }
    }
  }
}

export interface TypeResponse {
  pokemon: { pokemon: PokemonListItem }[]
}

export interface User {
  name: string
  email: string
}
