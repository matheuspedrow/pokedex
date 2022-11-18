import '../styles/main.css';
import '../styles/types.css';
import { loadPokemons } from './apiFunctions';
import { createPokemonBox } from './domFunctions';

const allPokes = [];
const numberPokesToShow = 450;
let test;

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'


window.onload = async () => {
	const test = await loadPokemons(20);
	console.log(test.length)
	createPokemonBox(test)
}
