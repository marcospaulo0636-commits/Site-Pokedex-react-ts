import type {
  PokemonDetails,
  PokemonListItem,
  PokemonListResponse,
  TypeResponse,
} from '../types/pokemon'
import { getIdFromUrl } from '../utils/helpers'

const BASE_URL = 'https://pokeapi.co/api/v2'

// Só usamos as 1025 espécies "oficiais" (ids acima disso são formas alternativas)
export const MAX_POKEMON_ID = 1025

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`)
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Pokémon não encontrado.')
    }
    throw new Error(`Erro ao acessar a PokéAPI (código ${response.status}).`)
  }
  return (await response.json()) as T
}

export async function getAllPokemon(): Promise<PokemonListItem[]> {
  const data = await request<PokemonListResponse>(`/pokemon?limit=${MAX_POKEMON_ID}&offset=0`)
  return data.results
}

export async function getPokemonByType(type: string): Promise<PokemonListItem[]> {
  const data = await request<TypeResponse>(`/type/${type}`)
  return data.pokemon
    .map((entry) => entry.pokemon)
    .filter((p) => Number(getIdFromUrl(p.url)) <= MAX_POKEMON_ID)
    .sort((a, b) => Number(getIdFromUrl(a.url)) - Number(getIdFromUrl(b.url)))
}

export function getPokemon(nameOrId: string | number): Promise<PokemonDetails> {
  return request<PokemonDetails>(`/pokemon/${String(nameOrId).toLowerCase()}`)
}
