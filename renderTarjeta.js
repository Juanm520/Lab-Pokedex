export function crearTarjeta(
    pokemon,
    { esFavorito = false, onAgregarFavorito, onEliminarFavorito } = {}
) {
    const tarjeta = document.createElement("article");
    const imagen = document.createElement("img");
    const nombre = document.createElement("h3");
    const stats = document.createElement("div");
    const ataque = document.createElement("div");
    const etiquetaAtaque = document.createElement("span");
    const valorAtaque = document.createElement("strong");
    const defensa = document.createElement("div");
    const etiquetaDefensa = document.createElement("span");
    const valorDefensa = document.createElement("strong");
    const boton = document.createElement("button");

    tarjeta.classList.add("tarjeta");
    stats.classList.add("stats");
    ataque.classList.add("stat");
    etiquetaAtaque.classList.add("stat-nombre");
    defensa.classList.add("stat");
    etiquetaDefensa.classList.add("stat-nombre");
    boton.classList.add(esFavorito ? "eliminar" : "agregar-favorito");

    tarjeta.dataset.nombre = pokemon.name;
    imagen.src = pokemon.sprites?.front_default ?? "";
    imagen.alt = pokemon.name;
    nombre.textContent = pokemon.name;
    etiquetaAtaque.textContent = "⚔️ Ataque";
    valorAtaque.textContent = pokemon.stats[1].base_stat;
    etiquetaDefensa.textContent = "🛡️ Defensa";
    valorDefensa.textContent = pokemon.stats[2].base_stat;
    boton.type = "button";
    boton.textContent = esFavorito ? "Eliminar" : "Agregar a favoritos";

    if (esFavorito) {
        boton.addEventListener("click", () => onEliminarFavorito(pokemon.id));
    } else {
        boton.addEventListener("click", () => onAgregarFavorito(pokemon));
    }

    ataque.append(etiquetaAtaque, valorAtaque);
    defensa.append(etiquetaDefensa, valorDefensa);
    stats.append(ataque, defensa);
    tarjeta.append(imagen, nombre, stats, boton);

    return tarjeta;
}
