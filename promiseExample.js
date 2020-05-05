// SAVE REFERENCE TO THE DOM ELEMENTS WE WILL USE
let pokemonList = document.getElementById('pokemon-list')
console.log('PROMISE EXAMPLE');
// API DOCS - https://pokeapi.co/
const loadPokemon = () => {
    
    // CREATE A FETCH GET REQUEST
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')                // Asynchronous operation - must be awaited
        .then( (apiResponse) => {
            console.log('apiResponse', apiResponse);                    // not JSON
            
            // PARSE THE RESPONSE BODY
            const jsonResponse = apiResponse.json();                     // Asynchronous operation - must be awaited
            console.log('jsonResponse', jsonResponse);                  // JSON Promise -> status, value
            return jsonResponse;                                        // return mandatory to chain thens
            }
        ).then( (pokeData) => {
            console.log('pokeData', pokeData);                         // JSON value
            
            // ITERATE OVER JSON DATA AND CREATE A LIST
            pokeData.results.forEach((pokemon, i) => {
                const listItem = document.createElement('li');           // pokeList.result is the array
                const name = document.createTextNode(`${i} - ${pokemon.name}`);
                listItem.appendChild(name);
                pokemonList.appendChild(listItem);

                // ADD "ON CLICK" EVENT LISTENER TO RENDER SELECTED POKEMON
                listItem.addEventListener('click', event => {
                    console.log('event', event);
                    console.log('event.target', event.target)
                    displayPokemon(event.target);
                })
            });                                             
        }).catch( (error) => console.log('Error fetching Poke', error))        
}

const displayPokemon = (clickedPokemon) => {
    
    const pokemonIndex = Number.parseInt(clickedPokemon.innerHTML);
    const pokemonImage = document.getElementById('selected-image');
    const pokemonName = document.getElementById('name');

    pokemonName.innerHTML = clickedPokemon.innerHTML.toUpperCase();
    pokemonName.style.visibility = 'visible';
    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
}

        loadPokemon();