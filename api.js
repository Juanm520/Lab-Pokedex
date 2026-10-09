const URL_API = "https://pokeapi.co/api/v2/pokemon?limit=20";

export async function traerPokemones() {
    const respuesta = await fetch(URL_API);
    const datos = await respuesta.json();
    const pokemones = [];

    for (const pokemon of datos.results) {
        const respuestaPokemon = await fetch(pokemon.url);
        const datosPokemon = await respuestaPokemon.json();

        pokemones.push(datosPokemon);
    }

    return pokemones;
}