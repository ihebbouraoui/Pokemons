import React from "react";
import {useGetPokemonByIdQuery} from "../api/pokemonApi";
import {useDispatch} from "react-redux";
import {selectedPokemon} from "../store/slices/pokimenSlice";

interface Props {
	url: string;
}

const PokemonListItem: React.FC<Props> = ({url}) => {
	function extractPokemonId(url: string): string {
		const match = url.match(/\/pokemon\/(\d+)\//);
		return match ? match[1] : "";
	}

	const id = extractPokemonId(url);
	const {data, isLoading, error} = useGetPokemonByIdQuery(id);
	const dispatch = useDispatch();

	if (isLoading || error || !data) return null;

	return (
		<div
			className="pokemon-card"
			onClick={() => dispatch(selectedPokemon(data))}
			style={{cursor: "pointer"}}
			role="button"
			tabIndex={0}
			onKeyPress={(e) => {
				if (e.key === "Enter" || e.key === " ") dispatch(selectedPokemon(data));
			}}
		>
			<img src={data.sprites?.front_default} alt={data.name}/>
			<div className="pokemon-name">{data.name}</div>
		</div>
	);
};

export default PokemonListItem;
