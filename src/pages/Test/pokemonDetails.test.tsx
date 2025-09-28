import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import PokemonDetail from "../pokemonDetails";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {clearSelectedPokemon} from "../../store/slices/pokimenSlice";

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useSelector: jest.fn(),
	useDispatch: () => mockDispatch,
}));

describe("PokemonDetail Component", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});


	it("should dispatch clearSelectedPokemon on button click", () => {
		const selectedPokemon = {
			name: "pikachu",
			height: 4,
			weight: 60,
			sprites: {
				front_default: "https://example.com/pikachu.png",
			},
			types: [{type: {name: "electric"}}],
		};

		const store = mockStore({
			pokemon: {selected: selectedPokemon},
		});

		jest.spyOn(require("react-redux"), "useSelector").mockImplementation((cb) =>
			// @ts-ignore
			cb(store.getState())
		);

		render(
			<Provider store={store}>
				<PokemonDetail/>
			</Provider>
		);

		const closeButton = screen.getByRole("button", {name: /close/i});
		fireEvent.click(closeButton);

		expect(mockDispatch).toHaveBeenCalledWith(clearSelectedPokemon());
	});
});
