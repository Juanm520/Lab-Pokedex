const CLAVE_FAVORITOS = "PokemonesFavoritos";

export function pokemonFavoritosLocalStorage(pokemon) {
    const pokemonesFavoritos = obtenerPokemonesfavoritos();
    const pokemonExiste = pokemonesFavoritos.some(
        favorito => favorito.id === pokemon.id
    );

    if (!pokemonExiste) {
        pokemonesFavoritos.push(pokemon);
    }

    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(pokemonesFavoritos));
}

export function obtenerPokemonesfavoritos() {
    const favoritosGuardados = localStorage.getItem(CLAVE_FAVORITOS);
    if (favoritosGuardados === null) {
        return [];
    }

    const pokemonesFavoritos = JSON.parse(favoritosGuardados);
    if (!Array.isArray(pokemonesFavoritos)) {
        throw new Error("Los favoritos guardados no tienen un formato válido.");
    }

    return pokemonesFavoritos;
}

export function eliminarPokemonFavorito(pokemonId) {
    const pokemonesFavoritos = obtenerPokemonesfavoritos();
    const favoritosActualizados = pokemonesFavoritos.filter(
        pokemon => pokemon.id !== pokemonId
    );

    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritosActualizados));
}
