let pokemonList = [
  { name: 'Nuzleaf', height: 3.03, types: ['grass', 'dark'] },
  { name: 'Charmander', height: 2, types: 'fire' },
  { name: 'Bulbasaur', height: 2.04, types: ['grass', 'poison'] }
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 3) {
    document.write(`<p> ${pokemonList[i].name}  (height: ${pokemonList[i].height}) - Wow, that's big! </p>`);
  } else {
    document.write(` <p>${pokemonList[i].name}  (height: ${pokemonList[i].height})</p>`);
  }
}
