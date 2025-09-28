export type PokemonListResult = {
	name: string;
	url: string;
};

export interface PokemonDetail {
	name: string;
	height: number;
	weight: number;
	sprites: {
		front_default: string;
	};
	types: { type: { name: string } }[];
	abilities: { ability: { name: string } }[];
}

export interface PokemonListWithDetails {
	name: string;
	url: string;
	details: PokemonDetail;
}
