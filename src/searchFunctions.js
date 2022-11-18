const searchField = document.querySelector('#search-text');
const searchType = document.querySelector('.search-type');


import {
  capitalizeFirstLetter,
  createElement,
  mainBox,
  showPages,
  selectPage,
} from "./domFunctions";

import { types } from './types'
import { readTypes } from './apiFunctions';

const selectType = (event) => {
	if (!event.target.classList.contains('icon')) return;
	if (event.target.classList.contains('select-type'))
		return event.target.classList.remove('select-type');
	event.target.classList.add('select-type');
};

export const createTypesSearch = (arrayOfPokemons) => {
	types.forEach((type) => {
		const newType = document.createElement('div');
		newType.classList.add('tooltips');
		newType.innerHTML = `<img src="./img/types/${type}.svg" alt="" class="icon ${type}"></img>
		<span class="tooltiptext">${capitalizeFirstLetter(type)}</span>`;
		newType.addEventListener('click', selectType)
		searchType.appendChild(newType);
	});
};

const filterNotFound = () => {
	document.querySelector('.pokes').innerHTML = '';
	document.querySelector('.not-found').style.display = 'contents';
	document.querySelector('.pagination-button').style.display = 'none';
}

const hideNotFound = () => {
	document.querySelector('.not-found').style.display = 'none';
	document.querySelector('.pagination-button').style.display = 'flex';
}

const getFilteredTypes = () => {
	const typesSelected = document.querySelectorAll('.select-type');
	let types = []
	typesSelected.forEach(
    (element) => (types = [...types, element.classList[1]])
  );
	return types;
};

const filterPokemon = (arrayOfPokemons) => {
	const searchName = searchField.value;
	const filteredTypes = getFilteredTypes().toString();
	let pokesToShow = arrayOfPokemons.filter(({ name }) => name.includes(searchName));
	if (filteredTypes.length !== 0) {
		pokesToShow = pokesToShow.filter(({ types }) => {
			const pokeTypes = readTypes(types);
			return (filteredTypes.includes(pokeTypes[0]) || filteredTypes.includes(pokeTypes[1]));
		});
	}

	if (pokesToShow.length === 0) return filterNotFound();
	hideNotFound();

	const maxPokeToShow = pokesToShow.length > 20 ? 20 : pokesToShow.length;
	document.querySelector('.pokes').innerHTML = '';

	for (let index = 0; index < maxPokeToShow; index ++) {
		const newBox = document.createElement('div');
		const { name, types, sprites, id } = pokesToShow[index];
		const pokemonBox = createElement(name, types, sprites, id);
		newBox.classList.add('poke-window');
		newBox.innerHTML = pokemonBox;
		mainBox.appendChild(newBox);
	}

	const totalPages = Math.round(pokesToShow.length / 20);
	showPages(1, totalPages, pokesToShow);
	selectPage(1);
};

export const searchText = (arrayOfPokemons) => 
	searchField.addEventListener('input',() => filterPokemon(arrayOfPokemons));