import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = 'https://pokeapi.co/api/v2/';

export type PokemonListResult = {
	name: string;
	url: string;
};

export const pokemonApi = createApi({
	reducerPath: "pokemonApi",
	baseQuery: fetchBaseQuery({baseUrl}),
	tagTypes: ["Pokemon"],

	endpoints: (build) => ({
		getPokemons: build.query<{ results: PokemonListResult[]; count: number },
			{ limit?: number; offset?: number } | void>({
			query: (params = {limit: 10, offset: 0}) =>
				`pokemon?limit=${params?.limit}`,
			providesTags: (res) =>
				res
					? [
						...res.results.map((r) => ({
							type: "Pokemon" as const,
							id: r.name,
						})),
						{type: "Pokemon", id: "LIST"},
					]
					: [{type: "Pokemon", id: "LIST"}],
		}),

		getPokemonById: build.query<any, string>({
			query: (id) => `pokemon/${id}`,
			providesTags: (res, error, id) => [{type: "Pokemon", id}],
		}),
	}),
});

export const {
	useGetPokemonsQuery,
	useGetPokemonByIdQuery,
} = pokemonApi;
