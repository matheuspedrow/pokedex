const searchField = document.querySelector('#search-text');

export const filterByName = (arrayOfPokemons) => {
	const searchName = searchField.value;
	const pokesToShow = arrayOfPokemons.filter(({ name }) => name.includes(searchName));
	document.querySelector('.pokes').innerHTML = '';
	console.log(pokesToShow)

	pokesToShow.forEach(({ name, types, sprites, id}) => {
		const newBox = document.createElement('div');
		const pokemonBox = createElement(name, types, sprites, id);
		newBox.classList.add('poke-window');
		newBox.innerHTML = pokemonBox;
		mainBox.appendChild(newBox);
	});
};

export const searchText = (arrayOfPokemons) => 
	searchField.addEventListener('keydown',() => filterByName(arrayOfPokemons));