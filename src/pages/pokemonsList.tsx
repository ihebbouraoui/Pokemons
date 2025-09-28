import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useGetPokemonsQuery} from "../api/pokemonApi";
import {setPokemons} from "../store/slices/pokimenSlice";
import PokemonListItem from "./pokemntListItem";

const PokemonList = () => {
	const {data, error, isLoading} = useGetPokemonsQuery({limit: 10},{refetchOnReconnect:true,refetchOnFocus:true});
	const dispatch = useDispatch();

	useEffect(() => {
		if (data?.results) {
			dispatch(setPokemons(data.results));
		}
	}, [data, dispatch]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error fetching Pokémon</div>;

	const listToShow = data?.results;

	return (
		<div className="pokemon-list">
			{listToShow?.map((item: any, index: number) => (
				<PokemonListItem key={index.toString()} url={item.url}/>
			))}
		</div>
	);
};

export default PokemonList;
