import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import {useGetPokemonByIdQuery} from "../../api/pokemonApi";
import {selectedPokemon} from "../../store/slices/pokimenSlice";
import PokemonListItem from "../pokemntListItem";
import configureStore from "redux-mock-store";

jest.mock("../../api/pokemonApi", () => ({
	useGetPokemonByIdQuery: jest.fn(),
}));

jest.mock("../../store/slices/pokimenSlice", () => ({
	selectedPokemon: jest.fn((payload) => ({type: "pokemon/selected", payload})),
}));

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useDispatch: () => mockDispatch,
}));

describe("PokemonListItem Component", () => {
	const mockUrl = "https://pokeapi.co/api/v2/pokemon/25/";

	afterEach(() => {
		jest.clearAllMocks();
	});


	it("dispatches selectedPokemon on click", () => {
		const pokemonData = {
			name: "pikachu",
			sprites: {front_default: "pikachu.png"},
		};

		(useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
			isLoading: false,
			error: false,
			data: pokemonData,
		});

		const store = mockStore({});
		render(
			<Provider store={store}>
				<PokemonListItem url={mockUrl}/>
			</Provider>
		);

		fireEvent.click(screen.getByRole("button"));
		expect(mockDispatch).toHaveBeenCalledWith(selectedPokemon(pokemonData));
	});

	it("dispatches selectedPokemon on Enter key", () => {
		const pokemonData = {
			name: "pikachu",
			sprites: {front_default: "pikachu.png"},
		};

		(useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
			isLoading: false,
			error: false,
			data: pokemonData,
		});

		const store = mockStore({});
		render(
			<Provider store={store}>
				<PokemonListItem url={mockUrl}/>
			</Provider>
		);

		fireEvent.keyPress(screen.getByRole("button"), {key: "Enter", code: "Enter", charCode: 13});
		expect(mockDispatch).toHaveBeenCalledWith(selectedPokemon(pokemonData));
	});
});
