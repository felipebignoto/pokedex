
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonName = document.querySelector(".pokemon_name");
const pokemonImg = document.querySelector(".pokemon_img");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML ="";

    const data = await fetchPokemon(pokemon);

    if(data){
       
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        input.value = '';
        searchPokemon = data.id;

        if(data.id < 722){
            pokemonImg.src = data['sprites']['versions']['generation-vi']['omegaruby-alphasapphire']['front_default'];//até o 721
        }
        else if (data.id < 808){
            pokemonImg.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];
        }
        else if(data.id <= 1008){
            pokemonImg.src = data['sprites']['front_default'];
        }
        else if(data.id <= 1010){
            pokemonName.innerHTML = "Not found";
            pokemonNumber.innerHTML ="";
            pokemonImg.style.display = "none";
        }
        
    }
    
    else{
        pokemonName.innerHTML = "Not found";
        pokemonNumber.innerHTML ="";
        pokemonImg.style.display = "none";
        
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

prev.addEventListener("click", () => {
    if(searchPokemon > 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
    else{
        searchPokemon = 1008;
        renderPokemon(searchPokemon);
    }
    
});

next.addEventListener("click", () => {
    if(searchPokemon < 1008){
        searchPokemon++;
        renderPokemon(searchPokemon);
    }
    else{
        searchPokemon = 1;
        renderPokemon(searchPokemon);
    }
    
});

renderPokemon(searchPokemon);