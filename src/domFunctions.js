import { readTypes } from './apiFunctions';

const mainBox = document.querySelector('.pokes');

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
	<h1>#${index} ${name}</h1>
	<img src="${front_default}" alt="" class="poke-image">
	<div class="poke-types">
		${createImages(types)}
	</div>
</div>`	
}

export const createPokemonBox = (arrayOfPokemons) => {
	arrayOfPokemons.forEach(({ name, types, sprites }, index) => {
		const newBox = document.createElement('div');
		const pokemonBox = createElement(name, types, sprites, index + 1);
		newBox.classList.add('poke-window');
		newBox.innerHTML = pokemonBox;
		mainBox.appendChild(newBox);
	});
}