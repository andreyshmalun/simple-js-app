let pokemonRepository = (function () {
  let pokemonList = [{ name: 'Nuzleaf', height: 3.03, types: ['grass', 'dark'] },
  { name: 'Charmander', height: 2, types: 'fire' },
  { name: 'Bulbasaur', height: 2.04, types: ['grass', 'poison'] }];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon is not an object!');
    }
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  function addListItem(pokemon) {
    let pokeList = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();


pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});