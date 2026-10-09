const URL_API = "https://pokeapi.co/api/v2/pokemon";

export async function traerPokemones() {
    const respuesta = await fetch(URL_API + "?limit=30");
    if (!respuesta.ok) {
        throw new Error(`No se pudo cargar la lista de Pokémon (${respuesta.status}).`);
    }

    const datos = await respuesta.json();
    return Promise.all(
        datos.results.map(async pokemon => {
            const respuestaPokemon = await fetch(pokemon.url);
            if (!respuestaPokemon.ok) {
                throw new Error(`No se pudo cargar a ${pokemon.name} (${respuestaPokemon.status}).`);
            }

            return respuestaPokemon.json();
        })
    );
}

export async function traerPokemon(nombre) {
    const respuesta = await fetch(`${URL_API}/${encodeURIComponent(nombre)}`);
    if (!respuesta.ok) {
        throw new Error(`No se encontró el Pokémon "${nombre}".`);
    }

    return respuesta.json();
}
