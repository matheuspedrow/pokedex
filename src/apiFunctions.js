const createArrayWithSize = (size) => Array.from({length: size}, (_, i) => i + 1);

const searchOn = () => {
	const search = document.querySelector('.search-itens');
	search.style.display = 'flex';
}

const filterOn = () => {
	const search = document.querySelector('.clean-filter-section');
	search.style.display = 'flex';
}

const searchOff = () => {
	const search = document.querySelector('.search-itens');
	search.style.display = 'none';
}

const loadingOff = () => {
	const loading = document.querySelector('.loading');
	loading.style.display = 'none';
}

export const turnOnOptions = () => {
	loadingOff();
	searchOn();
	filterOn();
}

export const loadPokemons = (numberOfPokemons) => {
	const pokemonArray = createArrayWithSize(numberOfPokemons);
	searchOff();
	const allPokes = pokemonArray.map((pokemon) => {
		return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
			.then((result) => result.json());
	});
	return Promise.all(allPokes)
		.then((result) => result);
};

export const readTypes = (types) => types.map(({ type }) => {
	const { name } = type;
	return name;
});