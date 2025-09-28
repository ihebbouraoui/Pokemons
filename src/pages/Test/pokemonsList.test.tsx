import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {pokemonApi} from "../../api/pokemonApi";
import {pokemonsSlice} from "../../store/slices/pokimenSlice";
import {setupServer} from "msw/node";
import PokemonList from "../pokemonsList";
import {http} from "msw";
import '@testing-library/jest-dom';

const server = setupServer(
	http.get("https://pokeapi.co/api/v2/pokemon", async () => {
		return new Response(
			JSON.stringify({
				count: 2,
				results: [
					{name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
					{name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/"},
				],
			}),
			{
				status: 200,
				headers: {"Content-Type": "application/json"},
			}
		);
	}),

	http.get("https://pokeapi.co/api/v2/pokemon/1", async () => {
		return new Response(
			JSON.stringify({
				id: 1,
				name: "bulbasaur",
				height: 7,
				weight: 69,
			}),
			{
				status: 200,
				headers: {"Content-Type": "application/json"},
			}
		);
	}),

	http.get("https://pokeapi.co/api/v2/pokemon/25", async () => {
		return new Response(
			JSON.stringify({
				id: 25,
				name: "pikachu",
				height: 4,
				weight: 60,
			}),
			{
				status: 200,
				headers: {"Content-Type": "application/json"},
			}
		);
	}),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithProviders(ui: React.ReactNode) {
	const store = configureStore({
		reducer: {
			pokemon: pokemonsSlice.reducer,
			[pokemonApi.reducerPath]: pokemonApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(pokemonApi.middleware),
	});

	return {
		store,
		...render(<Provider store={store}>{ui}</Provider>),
	};
}

describe("PokemonList Component", () => {

	test("renders list of pokemons after fetching", async () => {
		renderWithProviders(<PokemonList/>);
		expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
		expect(screen.getByText("pikachu")).toBeInTheDocument();
	});

	test("dispatches setPokemons action and updates store", async () => {
		const {store} = renderWithProviders(<PokemonList/>);
		await screen.findByText("bulbasaur");
		const state = store.getState();
		expect(state.pokemon.list.find((p) => p.name === "bulbasaur")).toBeDefined();
	});

	test("shows error message on fetch failure", async () => {
		server.use(
			http.get("https://pokeapi.co/api/v2/pokemon", async () => {
				return new Response(null, {status: 500});
			})
		);

		renderWithProviders(<PokemonList/>);
		expect(await screen.findByText(/error fetching pokémon/i)).toBeInTheDocument();
	});
});
