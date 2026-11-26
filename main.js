
import { traerPokemon } from "./api.js";

import {
    obtenerPokemonesfavoritos,
    pokemonFavoritosLocalStorage,
    eliminarPokemonFavorito
} from "./localStorage.js";

import { crearTarjeta } from "./renderTarjeta.js";

// Elementos del DOM
const formularioBusqueda = document.getElementById("formularioBusqueda");
const inputPokemon = document.getElementById("inputPokemon");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");
const mensajeBusqueda = document.getElementById("mensajeBusqueda");
const listaFavoritos = document.getElementById("listaFavoritos");
const contadorFavoritos = document.getElementById("contadorFavoritos");
const btnLimpiar = document.getElementById("btnLimpiar");

// Mostrar mensajes en la búsqueda
function mostrarMensajeBusqueda(mensaje) {
    const texto = document.createElement("p");
    texto.textContent = mensaje;

    mensajeBusqueda.replaceChildren(texto);
}

// Renderizar Pokémon favoritos
function renderizarFavoritos() {
    const favoritos = obtenerPokemonesfavoritos();

    contadorFavoritos.textContent = favoritos.length;

    if (favoritos.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Aún no tienes Pokémon favoritos.";

        listaFavoritos.replaceChildren(mensaje);
        return;
    }

    const tarjetas = favoritos.map(pokemon =>
        crearTarjeta(pokemon, {
            esFavorito: true,
            onEliminarFavorito: eliminarFavorito
        })
    );

    listaFavoritos.replaceChildren(...tarjetas);
}

// Agregar Pokémon a favoritos
function agregarFavorito(pokemon) {
    try {
        pokemonFavoritosLocalStorage(pokemon);
        renderizarFavoritos();
    } catch (error) {
        console.error("No se pudo guardar el Pokémon favorito.", error);
        mostrarMensajeBusqueda(
            "No se pudo guardar el favorito. Inténtalo de nuevo."
        );
    }
}

// Eliminar Pokémon de favoritos
function eliminarFavorito(pokemonId) {
    try {
        eliminarPokemonFavorito(pokemonId);
        renderizarFavoritos();
    } catch (error) {
        console.error("No se pudo eliminar el Pokémon favorito.", error);
        listaFavoritos.textContent =
            "No se pudo actualizar la lista de favoritos.";
    }
}

// Buscar Pokémon
formularioBusqueda.addEventListener("submit", async evento => {
    evento.preventDefault();

    const nombre = inputPokemon.value.trim();

    if (!nombre) {
        mostrarMensajeBusqueda(
            "Escribe el nombre de un Pokémon para buscarlo."
        );
        inputPokemon.focus();
        return;
    }

    resultadoBusqueda.replaceChildren();

    mostrarMensajeBusqueda("Buscando Pokémon...");

    try {
        const pokemon = await traerPokemon(nombre.toLowerCase());

        const tarjeta = crearTarjeta(pokemon, {
            onAgregarFavorito: agregarFavorito
        });

        resultadoBusqueda.append(tarjeta);

        mostrarMensajeBusqueda(`Encontramos a ${pokemon.name}.`);
    } catch (error) {
        console.error("Falló la búsqueda del Pokémon.", error);

        mostrarMensajeBusqueda(
            `No se encontró "${nombre}". Revisa el nombre e inténtalo de nuevo.`
        );
    }
});

// Limpiar búsqueda
btnLimpiar.addEventListener("click", () => {
    inputPokemon.value = "";
    resultadoBusqueda.replaceChildren();

    mostrarMensajeBusqueda(
        "¡Comienza tu exploración! Busca un Pokémon para conocer sus características."
    );

    inputPokemon.focus();
});

// Cargar favoritos al iniciar
try {
    renderizarFavoritos();
} catch (error) {
    console.error("No se pudieron cargar los Pokémon favoritos.", error);

    contadorFavoritos.textContent = "0";

    listaFavoritos.textContent =
        "No se pudieron cargar los favoritos guardados.";
}
