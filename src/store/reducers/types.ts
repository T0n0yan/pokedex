export interface initialRootState {
  pokemonsData: PokemonData | null;
  loading: boolean;
  error: string | undefined;
  pokemonInfo: PokemonInfo[] | null;
  singlePokemon: PokemonInfo | null;
  speciesUrl: SinglePokemonData | null;
  typesList: PokemonData | null;
  uniqueIdPokemon: PokemonInfo[] | null;
  currentPage: number;
  nextURL: string;
  previousURL: string;
  evolutionChain: EvolutionChain | null;
  total: number;
}
export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonUrl {
  url: string;
}
export interface PokemonData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonAbilites {
  ability: Pokemon;
  isHidden: boolean;
  slot: number;
}
export interface PokemonGameIndicaes {
  game_index: number;
  version: Pokemon;
}

export interface PokemonMoves {
  move: Pokemon;
  // version_group_details: any[]
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Pokemon;
  version: Pokemon;
}

export interface Genera {
  genus: string;
  language: Pokemon;
}
export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: Pokemon;
}
export interface PokemonTypes {
  slot: number;
  type: Pokemon;
}
export interface Name {
  language: Pokemon;
  name: string;
}
export interface PalParkEncounter {
  area: Pokemon;
  base_score: number;
  rate: number;
}
export interface PokedexNumber {
  entry_number: number;
  pokedex: Pokemon;
}
export interface Variety {
  is_default: boolean;
  pokemon: Pokemon;
}

export interface PokemonSprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other?: {
    dream_world: {
      front_default: string;
      front_female: string | null;
    };
    home: {
      front_default: string;
      front_female: string | null;
      front_shiny: string;
      front_shiny_female: string | null;
    };
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
  };
}

export interface PokemonInfo {
  abilities: PokemonAbilites[];
  base_experience: number;
  forms: Pokemon[];
  id: number;
  game_indices: PokemonGameIndicaes[];
  // held_items: any[];
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMoves[];
  name: string;
  order: number;
  // past_types: any[];
  species: Pokemon;
  sprites: PokemonSprites;
  stats: PokemonStats[];
  types: PokemonTypes[];
  weight: number;
  height: number;
}

export interface SinglePokemonData {
  base_happiness: number;
  capture_rate: number;
  color: Pokemon;
  egg_groups: Pokemon[];
  evolution_chain: PokemonUrl;
  // evolves_from_species: any;
  flavor_text_entries: FlavorTextEntry[];
  // form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genera[];
  generation: Pokemon;
  growth_rate: Pokemon;
  habitat: Pokemon;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Pokemon;
  varieties: Variety[];
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource<Pokemon> | null;
  chain: ChainLink;
}

export interface NamedAPIResource<T> {
  name: string;
  url: string;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource<Pokemon>;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionDetail {
  item: NamedAPIResource<Pokemon> | null;
  trigger: NamedAPIResource<Pokemon>;
  gender: number | null;
  held_item: NamedAPIResource<Pokemon> | null;
  known_move: NamedAPIResource<Pokemon> | null;
  known_move_type: NamedAPIResource<Pokemon> | null;
  location: NamedAPIResource<Pokemon> | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource<Pokemon> | null;
  party_type: NamedAPIResource<Pokemon> | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource<Pokemon> | null;
  turn_upside_down: boolean;
}
