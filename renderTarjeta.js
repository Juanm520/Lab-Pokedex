import { traerPokemones } from "./api.js";

const contenedor = document.getElementById("container-tarjetas");
const favoritos = document.getElementById("listaFavoritos");

// Plantilla de tarjeta normal
function crearTarjeta(pokemon) {
    return `
        <div class="tarjeta" data-nombre="${pokemon.name}">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <div class="stats">
                <div class="stat"><span class="stat-nombre">⚔️ Ataque</span><strong>${pokemon.stats[1].base_stat}</strong></div>
                <div class="stat"><span class="stat-nombre">🛡️ Defensa</span><strong>${pokemon.stats[2].base_stat}</strong></div>
            </div>
            <button class="agregar-favorito">Agregar a favoritos</button>
            <button class="eliminar">Eliminar</button>
        </div>
    `;
}

// Plantilla de tarjeta favorita
function crearFavorito(pokemon) {
    return `
        <div class="tarjeta" data-nombre="${pokemon.name}">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <div class="stats">
                <div class="stat"><span class="stat-nombre">⚔️ Ataque</span><strong>${pokemon.stats[1].base_stat}</strong></div>
                <div class="stat"><span class="stat-nombre">🛡️ Defensa</span><strong>${pokemon.stats[2].base_stat}</strong></div>
            </div>
            <button disabled>✓ En favoritos</button>
            <button class="eliminar">Eliminar</button>
        </div>
    `;
}

// Mostrar Pokémon
async function mostrarPokemones() {
    const pokemones = await traerPokemones();

    pokemones.forEach(pokemon => {
        contenedor.innerHTML += crearTarjeta(pokemon);
    });
}

// Agregar a favoritos
export function agregarAFavoritos(pokemon) {
    favoritos.innerHTML += crearFavorito(pokemon);
}

mostrarPokemones();