import { readTypes } from './apiFunctions';

const mainBox = document.querySelector('.pokes');
const paginationDiv = document.querySelector('.pagination-button');

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const definePokemonRange = (currentPage) => {
	const limitItem = 20;
	if (currentPage === 1) return {min: 1, max: limitItem};
	return {min: currentPage * limitItem - limitItem + 1, max: currentPage * limitItem};
};

const createImages = (types) => {
	const pokeTypes = readTypes(types);

	if (pokeTypes.length === 1) 
		return `<img src="./img/types/${pokeTypes}.svg" alt="" class="icon ${pokeTypes}"></img>`;

	return `<img src="./img/types/${pokeTypes[0]}.svg" alt="" class="icon ${pokeTypes[0]}"></img>
					<img src="./img/types/${pokeTypes[1]}.svg" alt="" class="icon ${pokeTypes[1]}"></img>`; 
};

const createElement = (name, types, sprites, index) => {
	const { front_default } = sprites;

	return `<div class="poke-window">
	<h1>#${index} ${capitalizeFirstLetter(name)}</h1>
	<img src="${front_default}" alt="" class="poke-image">
	<div class="poke-types">
		${createImages(types)}
	</div>
</div>`;
};
const resetPokemonBox = () => mainBox.innerHTML = '';

export const createPokemonBox = (arrayOfPokemons, min = 1, max = 20) => {
		const pokesToShow = arrayOfPokemons.filter(({ id }) => id >= min && id <= max);
		resetPokemonBox();
		pokesToShow.forEach(({ name, types, sprites, id}) => {
			const newBox = document.createElement('div');
			const pokemonBox = createElement(name, types, sprites, id);
			newBox.classList.add('poke-window');
			newBox.innerHTML = pokemonBox;
			mainBox.appendChild(newBox);
		});
};

const definePageRange = (currentPage, totalPages) => {
	if (currentPage > 4 && currentPage < totalPages - 4)
    return { min: currentPage - 4, max: currentPage + 4 };
  else if (currentPage >= totalPages - 4)
    return { min: totalPages - 9, max: totalPages };
	if (totalPages < 9) return {min: 1, max: totalPages}; 
	return {min: 1, max: 9};
};

const buttonUpdate = (pokeList, min, max, buttonValue, totalPages) => {
	createPokemonBox(pokeList, min, max);
	showPages(buttonValue, totalPages, pokeList);
	document.querySelector(`.button-${buttonValue}`).classList.add('page-selected');
} 

const createShowPageEvent = (pokeList, totalPages) => {
	const totalButtons = document.querySelectorAll('.page-button');
	totalButtons.forEach((button) => {
		const buttonValue = parseInt(button.innerText);
		const { min, max } = definePokemonRange(buttonValue);
		button.addEventListener('click', () => buttonUpdate(pokeList, min, max, buttonValue, totalPages));
	});
};

export const showPages = (currentPage, totalPages, pokeList) => {
	const { min, max } = definePageRange(currentPage, totalPages);
	const paginationDiv = document.querySelector('.pagination-button');
	paginationDiv.innerHTML = '';

	for (let pageIndex = min; pageIndex <= max; pageIndex ++)
	{
		const divButton = document.createElement('div');
		divButton.innerHTML = 
		`<button type="button" class="btn btn-primary page-button button-${pageIndex}">
		 	<i class="fas fa-search"><span>${pageIndex}</span></i>
		</button>`;
		paginationDiv.appendChild(divButton);
	}
	createShowPageEvent(pokeList, totalPages);
};