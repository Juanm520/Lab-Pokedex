export function pokemonFavoritosLocalStorage(pokemon){

    let pokemonesFavoritos = []

    const favoritosGuardados = localStorage.getItem("PokemonesFavoritos")

    if (favoritosGuardados !== null) {
        pokemonesFavoritos = JSON.parse(favoritosGuardados)
    }

    const pokemonExiste = pokemonesFavoritos.some(
        pokemonFavorito => pokemonFavorito.nombre === pokemon.nombre
    )

    if (!pokemonExiste) {
        pokemonesFavoritos.push(pokemon)
    }

    localStorage.setItem("PokemonesFavoritos", JSON.stringify(pokemonesFavoritos))
}

export function obtenerPokemonesfavoritos(){
    const pokemonesFavoritos = localStorage.getItem("PokemonesFavoritos")
    return JSON.parse(pokemonesFavoritos)
}

export function eliminarPokemonFavorito(pokemonId){
   const favoritosGuardados = localStorage.getItem("PokemonesFavoritos")

   // Filtrar y elminar.
   const pokemonesFavoritos = favoritosGuardados === null ? [] : JSON.parse(favoritosGuardados)

   const favoritosActualizados = pokemonesFavoritos.filter(
       pokemon => pokemon.id !== pokemonId
   )

   // Guardarlo en el LocalStorage.
   localStorage.setItem("PokemonesFavoritos", JSON.stringify(favoritosActualizados))
}
