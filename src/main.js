import '../styles/main.css';
import '../styles/types.css';
import '../styles/loading.css';

import { loadPokemons, turnOnOptions } from "./apiFunctions";
import {
  showPages,
  createPokemonBox,
  selectPage,
} from "./domFunctions";
import { 
	searchText,
	createSearchArea,
	cleanFilterButton,
} from "./searchFunctions";

const totalPokemonsToShow = 898;
let totalPages = Math.ceil(totalPokemonsToShow / 20);
const currentPage = 1;

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

window.onload = async () => {
	const pokemonList = await loadPokemons(totalPokemonsToShow);
	turnOnOptions();
	createSearchArea(pokemonList)
	createPokemonBox(pokemonList)
	showPages(currentPage, totalPages, pokemonList);
	searchText(pokemonList);
	selectPage(currentPage);
	cleanFilterButton(pokemonList);
}
