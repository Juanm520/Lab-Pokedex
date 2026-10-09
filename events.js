import { traerPokemon, traerPokemones } from "./api.js";
import {
    eliminarPokemonFavorito,
    obtenerPokemonesfavoritos,
    pokemonFavoritosLocalStorage
} from "./localStorage.js";
import { crearTarjeta } from "./renderTarjeta.js";

const formularioBusqueda = document.getElementById("formularioBusqueda");
const inputPokemon = document.getElementById("inputPokemon");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");
const mensajeBusqueda = document.getElementById("mensajeBusqueda");
const listaFavoritos = document.getElementById("listaFavoritos");
const contenedorPokemones = document.getElementById("container-tarjetas");
const btnLimpiar = document.getElementById("btnLimpiar");

function mostrarMensajeBusqueda(mensaje) {
    const texto = document.createElement("p");
    texto.textContent = mensaje;
    mensajeBusqueda.replaceChildren(texto);
}

function renderizarFavoritos() {
    const favoritos = obtenerPokemonesfavoritos();
    const tarjetas = favoritos.map(pokemon =>
        crearTarjeta(pokemon, {
            esFavorito: true,
            onEliminarFavorito: eliminarFavorito
        })
    );

    listaFavoritos.replaceChildren(...tarjetas);
}

function agregarFavorito(pokemon) {
    try {
        pokemonFavoritosLocalStorage(pokemon);
        renderizarFavoritos();
    } catch (error) {
        console.error("No se pudo guardar el Pokémon favorito.", error);
        mostrarMensajeBusqueda("No se pudo guardar el favorito. Inténtalo de nuevo.");
    }
}

function eliminarFavorito(pokemonId) {
    try {
        eliminarPokemonFavorito(pokemonId);
        renderizarFavoritos();
    } catch (error) {
        console.error("No se pudo eliminar el Pokémon favorito.", error);
        listaFavoritos.textContent = "No se pudo actualizar la lista de favoritos.";
    }
}

formularioBusqueda.addEventListener("submit", async evento => {
    evento.preventDefault();
    const nombre = inputPokemon.value.trim();

    if (!nombre) {
        mostrarMensajeBusqueda("Escribe el nombre de un Pokémon para buscarlo.");
        inputPokemon.focus();
        return;
    }

    resultadoBusqueda.replaceChildren();
    mostrarMensajeBusqueda("Buscando Pokémon...");

    try {
        const pokemon = await traerPokemon(nombre.toLowerCase());
        resultadoBusqueda.append(
            crearTarjeta(pokemon, { onAgregarFavorito: agregarFavorito })
        );
        mostrarMensajeBusqueda(`Encontramos a ${pokemon.name}.`);
    } catch (error) {
        console.error("Falló la búsqueda del Pokémon.", error);
        mostrarMensajeBusqueda(`No se encontró "${nombre}". Revisa el nombre e inténtalo de nuevo.`);
    }
});

btnLimpiar.addEventListener("click", () => {
    inputPokemon.value = "";
    resultadoBusqueda.replaceChildren();
    inputPokemon.focus();
});

try {
    renderizarFavoritos();
} catch (error) {
    console.error("No se pudieron cargar los Pokémon favoritos.", error);
    listaFavoritos.textContent = "No se pudieron cargar los favoritos guardados.";
}

traerPokemones()
    .then(pokemones => {
        const tarjetas = pokemones.map(pokemon =>
            crearTarjeta(pokemon, { onAgregarFavorito: agregarFavorito })
        );
        contenedorPokemones.replaceChildren(...tarjetas);
    })
    .catch(error => {
        console.error("No se pudo cargar el catálogo de Pokémon.", error);
        contenedorPokemones.textContent = "No se pudo cargar la lista de Pokémon.";
    });
