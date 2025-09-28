import React from 'react';
import './App.css';
import PokemonList from "./pages/pokemonsList";
import {
	BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import './style/main.scss'
import PokemonDetail from "./pages/pokemonDetails";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";

function App() {
	const data = useSelector((state: RootState) => state.pokemon.selected);
	console.log(data.weight)
	return (
		<Router>
			<div>
				<h1> Pokemon</h1>

				<div style={{display:'flex',justifyContent:'space-between'}}>
					<PokemonList/>
					{
						data.weight && <PokemonDetail/>
					}
				</div>

			</div>
		</Router>
	);
}

export default App;
