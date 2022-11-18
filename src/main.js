import '../styles/main.css';
import '../styles/types.css';
import { loadPokemons } from "./apiFunctions";
import {
  showPages,
  createPokemonBox,
  selectPage,
} from "./domFunctions";
import { searchText, createTypesSearch } from "./searchFunctions";

const totalPokemonsToShow = 55;
let totalPages = Math.round(totalPokemonsToShow / 20);
const currentPage = 1;

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

window.onload = async () => {
	createTypesSearch();
	const pokemonList = await loadPokemons(totalPokemonsToShow);
	createPokemonBox(pokemonList)
	showPages(currentPage, totalPages, pokemonList);
	searchText(pokemonList);
	selectPage(1);
}
