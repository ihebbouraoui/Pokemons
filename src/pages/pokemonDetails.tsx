import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { clearSelectedPokemon } from "../store/slices/pokimenSlice";

const PokemonDetail = () => {
	const dispatch = useDispatch();
	const data = useSelector((state: RootState) => state.pokemon.selected);

	if (!data) return null;

	return (
		<div className="pokemon-detail">
			<button onClick={() => dispatch(clearSelectedPokemon())}>Close</button>
			<img src={data && data?.sprites?.front_default} alt={data.name} />
			<h2>{data?.name}</h2>
			<p><strong>Height:</strong> {data?.height}</p>
			<p><strong>Weight:</strong> {data?.weight}</p>
			<p><strong>Type:</strong> {data?.types?.map((t: any) => t.type.name).join(", ")}</p>
		</div>
	);
};
export default PokemonDetail
