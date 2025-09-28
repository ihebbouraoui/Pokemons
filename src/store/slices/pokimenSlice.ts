import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface item {
	name?: string,
	url?: string;
}
export interface pokemonState {
	list:item[],
	selected:any
}


export const initialPokemon: pokemonState = {
	list:[],
	selected:{}
};

export const pokemonsSlice = createSlice({
	name: 'pokemons',
	initialState: initialPokemon,
	reducers: {
		setPokemons: (state:any, action: PayloadAction<item[]>): void => {
			state.list = action.payload
		},
		selectedPokemon: (state, action: PayloadAction<any>) => {
			state.selected = action.payload;
		},
		clearPokemons: (state:any): void => {
			state.list = []
		},
		clearSelectedPokemon: (state:any): void => {
			state.selected = {}
		},

	},
});

export const {setPokemons,clearPokemons,selectedPokemon,clearSelectedPokemon} = pokemonsSlice.actions;

