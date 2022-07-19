let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=200';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon is not an object!');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let buttonItem = document.createElement('button');
    buttonItem.classList.add('pokemonButton');
    buttonItem.innerText = pokemon.name.toUpperCase();
    buttonItem.setAttribute('data-toggle', 'modal');
    buttonItem.setAttribute('data-target', '#pokemon-modal');
    $(buttonItem).addClass('button-class btn');
    pokemonItem.appendChild(buttonItem);
    pokemonList.appendChild(pokemonItem);
    buttonItem.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }


  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //Add the details to the item
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types.map((type) => type.type.name).join(', ');
      item.abilities = details.abilities.map((ability) => ability.ability.name).join(', ');
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Modal section
  let modalContainer = document.querySelector('#pokemon-modal');

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let imageElement = $('<img class="pokemon-img">');
    imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');
    let typeElement = $('<p>' + 'Types : ' + pokemon.types + '</p>');
    let abilitiesElement = $('<p>' + 'Abilities : ' + pokemon.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);

  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


//search function
function searchFunction(event) {
  let pokemonNames = document.getElementsByClassName('pokemonButton');
  let { value } = event.target;
  let searchQuery = value.toLowerCase();
  for (let pokemonName of pokemonNames) {
    let name = pokemonName.textContent.toLowerCase();
    //display pokemon name if it contains value inside of search
    if (name.includes(searchQuery)) {
      pokemonName.closest('li').style.display = 'inline-block';
    } else {
      pokemonName.closest('li').style.display = 'none';
    }
  }
}

let search = document.getElementById('search');
search.addEventListener('keyup', searchFunction);