const searchField = document.querySelector('#search-text');
import { createElement, mainBox, showPages, selectPage } from './domFunctions';

export const filterByName = (arrayOfPokemons) => {
	const searchName = searchField.value;
	const pokesToShow = arrayOfPokemons.filter(({ name }) => name.includes(searchName));
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
	searchField.addEventListener('input',() => filterByName(arrayOfPokemons));