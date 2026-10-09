import { obtenerPokemonesfavoritos, pokemonFavoritosLocalStorage, eliminarPokemonFavorito } from "./localStorage"

// Tarea 6: Configurar Event Listeners

// Input y boton buscar
const btnBuscar = document.getElementById('btnBuscar');
const inputPokemon = document.getElementById('inputPokemon');

// Agregar Listener
btnBuscar.addEventListener('click',  async () => {

    const nombre = inputPokemon.value.trim();

    if (nombre === '') {
        alert('Por favor, ingresa un nombre.');
        return
    }

    // Limpiar resultado anterior
    resultadoBusqueda.innerHTML = ''; 

    try {
        const pokemon = await fetchPokemon(nombre);
        if (pokemon) {
            crearTarjeta(pokemon, resultadoBusqueda, false);
        }
    }
    catch(error) {
        console.log("Fallo al encontrar el pokemon " + error)
    }
});

// Boton Limpiar
const btnLimpiar = document.getElementById('btnLimpiar');
btnLimpiar.addEventListener('click', () => {
    inputPokemon.value = '';
    resultadoBusqueda.innerHTML = '';
});


// Agregar favoritos
const btnAgregarFavoritos = document.getElementById('btnFavoritos');
btnAgregarFavoritos.addEventListener("click", () => {
    pokemonFavoritosLocalStorage()
    renderPokemonFavoritos()
})

// Inicialización
document.addEventListener('DOMContentLoaded', obtenerPokemonesfavoritos);
const resultadoBusqueda = document.getElementById('resultadoBusqueda');
const listaFavoritos = document.getElementById('listaFavoritos');