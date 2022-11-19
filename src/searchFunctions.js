const searchField = document.querySelector('#search-text');
const searchType = document.querySelector('.search-type');
const searchBox = document.querySelector('.gen-search');


import {
  capitalizeFirstLetter,
  createElement,
  mainBox,
  showPages,
  selectPage,
	showPokeInfos,
	pokeBox,
} from "./domFunctions";

import { types, generations, pokesPerGen } from './extras'
import { readTypes } from './apiFunctions';

const selectType = (event) => {
	if (!event.target.classList.contains('icon')) return;
	if (event.target.classList.contains('select-type'))
		return event.target.classList.remove('select-type');
	event.target.classList.add('select-type');
};

const selectGen = (event) => {
	if (!event.target.classList.contains('gen-icon')) return;
	if (event.target.classList.contains('select-gen'))
		return event.target.classList.remove('select-gen');
	event.target.classList.add('select-gen');
};

export const createTypesSearch = (arrayOfPokemons) => {
	types.forEach((type) => {
		const newType = document.createElement('div');
		newType.classList.add('tooltips');
		newType.innerHTML = `<img src="./img/types/${type}.svg" alt="" class="icon ${type}"></img>
		<span class="tooltiptext">${capitalizeFirstLetter(type)}</span>`;
		newType.addEventListener('click', selectType)
		newType.addEventListener('click', () => filterPokemon(arrayOfPokemons))
		searchType.appendChild(newType);
	});
};

const createGenerationSearch = (arrayOfPokemons) => {
	generations.forEach((type) => {
		const newType = document.createElement('div');
		newType.classList.add('tooltips');
		newType.innerHTML = `<img src="./img/generation/${type}.png" alt="" class="gen-icon ${type}"></img>
		<span class="tooltiptext">${capitalizeFirstLetter(type)}</span>`;
		newType.addEventListener('click', selectGen)
		newType.addEventListener('click', () => filterPokemon(arrayOfPokemons))
		searchBox.appendChild(newType);
	});
};

export const createSearchArea = (arrayOfPokemons) => {
	createTypesSearch(arrayOfPokemons);
	createGenerationSearch(arrayOfPokemons);
}

const filterNotFound = () => {
	document.querySelector('.pokes').innerHTML = '';
	document.querySelector('.not-found').style.display = 'contents';
	document.querySelector('.pagination-button').style.display = 'none';
}

const hideNotFound = () => {
	document.querySelector('.not-found').style.display = 'none';
	document.querySelector('.pagination-button').style.display = 'flex';
}

const filterBy = (filterOption = '.select-type') => {
	const selectedFilter = document.querySelectorAll(filterOption);
	let filteredArray = []
	selectedFilter.forEach(
    (filter) => (filteredArray = [...filteredArray, filter.classList[1]])
  );
	return filteredArray;
};

const genFilter = (arrayOfPokemons, filteredGen) => {

	if (filteredGen.length === 0) return arrayOfPokemons;
	return arrayOfPokemons
		.filter(({ id }) => {
			let fromGen = false;
			filteredGen
				.forEach((gen) => {
					const genStart = pokesPerGen[`${gen}start`];
					const genEnd = pokesPerGen[`${gen}end`];
					if (id >= genStart && id <= genEnd) fromGen = true;
				});
			return fromGen;
	});
};

const initialFilter = (arrayOfPokemons) => {
	const searchName = searchField.value.toLowerCase();
	const filteredTypes = filterBy('.select-type').toString();
	const filteredGen = filterBy('.select-gen');
	
	let pokesToShow = arrayOfPokemons.filter(({ name }) => name.includes(searchName));
	pokesToShow = genFilter(pokesToShow, filteredGen);
	
	if (filteredTypes.length !== 0) {
		pokesToShow = pokesToShow.filter(({ types }) => {
			const pokeTypes = readTypes(types);
			return (filteredTypes.includes(pokeTypes[0]) || filteredTypes.includes(pokeTypes[1]));
		});
	}
	return pokesToShow;
};

const filterPokemon = (arrayOfPokemons) => {
	const filteredPokemonList = initialFilter(arrayOfPokemons);
	pokeBox.style.display = 'none';
	if (filteredPokemonList.length === 0) return filterNotFound();
	hideNotFound();

	const maxPokeToShow = filteredPokemonList.length > 20 ? 20 : filteredPokemonList.length;
	document.querySelector('.pokes').innerHTML = '';

	for (let index = 0; index < maxPokeToShow; index ++) {
		const newBox = document.createElement('div');
		const { name, types, sprites, id } = filteredPokemonList[index];
		const pokemonBox = createElement(name, types, sprites, id);
		newBox.classList.add('poke-window');
		newBox.innerHTML = pokemonBox;
		newBox.addEventListener('click', () => showPokeInfos(arrayOfPokemons[id - 1]))
		mainBox.appendChild(newBox);
	}
	console.log('entrou')

	const totalPages = Math.ceil(filteredPokemonList.length / 20);
	showPages(1, totalPages, filteredPokemonList);
	selectPage(1);
};

export const searchText = (arrayOfPokemons) => 
	searchField.addEventListener('input',() => filterPokemon(arrayOfPokemons));