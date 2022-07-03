let pokemonRepository = (function () {
  let pokemonList = [{ name: 'Nuzleaf', height: 3.03, types: ['grass', 'dark'] },
  { name: 'Charmander', height: 2, types: 'fire' },
  { name: 'Bulbasaur', height: 2.04, types: ['grass', 'poison'] }];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    add: add,
    getAll: getAll
  };
})();


function pokeLoop(pokemon) {
  if (pokemon.height > 3) {
    document.write(`<p> ${pokemon.name}  (height: ${pokemon.height}) - Wow, that's big! </p>`);
  } else {
    document.write(`<p> ${pokemon.name}  (height: ${pokemon.height})</p>`);
  }
}

pokemonRepository.getAll().forEach(pokeLoop);
