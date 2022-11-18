import '../styles/main.css';
import '../styles/types.css';
import { loadPokemons } from './apiFunctions';
import { showPages, createPokemonBox } from './domFunctions';
import { searchText } from './searchFunctions';

const totalPokemonsToShow = 300;
let totalPages = Math.round(totalPokemonsToShow / 20);
const currentPage = 1;

let pokemonList;

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

window.onload = async () => {
	const pokemonList = await loadPokemons(totalPokemonsToShow);
	createPokemonBox(pokemonList)
	showPages(currentPage, totalPages, pokemonList);
	searchText(pokemonList);
}
