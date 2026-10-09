
import { traerPokemones } from "./api.js";

const favoritos = document.getElementById("listaFavoritos");
const contenedor = document.getElementById("container-tarjetas");

let pokemones = [];

// 1. Crear tarjetas de Pokémon
function crearTarjetas(pokemon) {

    // Crear todos los elementos
    const tarjeta = document.createElement("div");
    const imagen = document.createElement("img");
    const nombre = document.createElement("h3");
    const stats = document.createElement("div");
    const ataque = document.createElement("div");
    const etiquetaAtaque = document.createElement("span");
    const valorAtaque = document.createElement("strong");
    const defensa = document.createElement("div");
    const etiquetaDefensa = document.createElement("span");
    const valorDefensa = document.createElement("strong");
    const btnFavorito = document.createElement("button");
    const btnEliminar = document.createElement("button");


    // Crear todas las clases
    tarjeta.classList.add("tarjeta");
    stats.classList.add("stats");
    ataque.classList.add("stat");
    etiquetaAtaque.classList.add("stat-nombre");
    defensa.classList.add("stat");
    etiquetaDefensa.classList.add("stat-nombre");
    btnFavorito.classList.add("agregar-favorito");
    btnEliminar.classList.add("eliminar");


    // Crear todos los atributos
    tarjeta.setAttribute("data-nombre", pokemon.name);
    imagen.setAttribute("src", pokemon.sprites.front_default);
    imagen.setAttribute("alt", pokemon.name);


    // Asignar todos los textos
    nombre.textContent = pokemon.name;
    etiquetaAtaque.textContent = "⚔️ Ataque";
    valorAtaque.textContent = pokemon.stats[1].base_stat;
    etiquetaDefensa.textContent = "🛡️ Defensa";
    valorDefensa.textContent = pokemon.stats[2].base_stat;
    btnFavorito.textContent = "Agregar a favoritos";
    btnEliminar.textContent = "Eliminar";


    // Agregar los elementos con append()
    ataque.append(etiquetaAtaque, valorAtaque);
    defensa.append(etiquetaDefensa, valorDefensa);

    stats.append(ataque, defensa);

    tarjeta.append(
        imagen,
        nombre,
        stats,
        btnFavorito,
        btnEliminar
    );

    return tarjeta;
}

// Mostrar los Pokémon en el HTML
async function mostrarPokemones() {
    pokemones = await traerPokemones();

    pokemones.forEach(pokemon => {
        contenedor.append(crearTarjetas(pokemon));
    });
}

// 6. Ejecutar la función inicial
mostrarPokemones();