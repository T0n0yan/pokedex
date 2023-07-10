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
    
}



