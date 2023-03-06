
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonName = document.querySelector(".pokemon_name");
const pokemonImg = document.querySelector(".pokemon_img");

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['front_defautl'];
}

renderPokemon("25");

