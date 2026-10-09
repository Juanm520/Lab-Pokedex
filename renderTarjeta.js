import { traerPokemones } from "./api.js";

function crearTarjeta(pokemon) {
    const tarjeta = document.createElement("div");
    const imagen = document.createElement("img");
    const nombre = document.createElement("h3");
    const ataque = document.createElement("p");
    const defensa = document.createElement("p");

    imagen.src = pokemon.sprites.front_default;
    nombre.textContent = pokemon.name;
    ataque.textContent = "Ataque: " + pokemon.stats[1].base_stat;
    defensa.textContent = "Defensa: " + pokemon.stats[2].base_stat;

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(ataque);
    tarjeta.appendChild(defensa);

    return tarjeta;
}

async function mostrarPokemones() {
    const pokemones = await traerPokemones();
    const contenedor = document.getElementById("container-tarjetas");

    for (const pokemon of pokemones) {
        const tarjeta = crearTarjeta(pokemon);
        contenedor.appendChild(tarjeta);
    }
}

mostrarPokemones();