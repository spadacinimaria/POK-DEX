const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
 
const generatePokemonPromises = () =>
  Array.from({ length: 1025}, (_, index) => {
    const url = getPokemonUrl(index + 1);
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar Pokémon: ${response.status}`);
        }
        return response.json();
      });
  });
 
 
const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name);
   
    accumulator += `
      <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(" | ")}</p>
      </li>
    `;
    return accumulator;
  }, "");
};
 
 
const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};
 
Promise.all(generatePokemonPromises())
  .then(generateHTML)
  .then(insertPokemonsIntoPage)
  .catch(error => {
    console.error('Erro ao carregar os Pokémon:', error);
  });