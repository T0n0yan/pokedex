import {PokemonTypes} from "store/reducers/types"

export type TCardProps = {
    url: string | undefined
    title: string
    hashId: string
    types: PokemonTypes[]
}
