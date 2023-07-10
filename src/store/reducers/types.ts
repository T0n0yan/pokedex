export interface Pokemon {
    name: string;
    url: string;
}
export interface PokemonData {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}
export interface RootState {
    pokemonsData: PokemonData | null;
    loading: boolean,
    error: string | undefined,
    pokemonInfo: PokemonInfo[] | null
}

export interface PokemonAbilites {
    ability: Pokemon[],
    isHidden: boolean,
    slot: number,
}
export interface PokemonGameIndicaes {
    game_index: number,
    version: Pokemon
}

export interface PokemonMoves {
    move: Pokemon,
    version_group_details: any[]
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
        "official-artwork": {
            front_default: string;
            front_shiny: string;
        };
    };
}
export interface PokemonStats {
    base_stat: number;
    effort: number;
    stat: Pokemon
}
export interface PokemonTypes {
    slot: number;
    type: Pokemon
}

export interface PokemonInfo {
    abilities: PokemonAbilites[],
    base_experience: number;
    forms: Pokemon[],
    game_indices: PokemonGameIndicaes[]
    height: number;
    held_items: any[]; // Specify the actual type if available
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: PokemonMoves[]
    name: string;
    order: number;
    past_types: any[]; // Specify the actual type if available
    species: Pokemon;
    sprites: PokemonSprites;
    stats: PokemonStats[];
    types: PokemonTypes[];
    weight: number;
}