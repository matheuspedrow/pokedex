const createArrayWithSize = (size) => Array.from({length: size}, (_, i) => i + 1);

export const loadPokemons = (numberOfPokemons) => {
	const pokemonArray = createArrayWithSize(numberOfPokemons);
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