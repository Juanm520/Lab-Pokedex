
export function crearTarjeta(
    pokemon,
    { esFavorito = false, onAgregarFavorito, onEliminarFavorito } = {}
) {
    const tarjeta = document.createElement("article");
    const encabezado = document.createElement("div");
    const numero = document.createElement("span");
    const imagenContenedor = document.createElement("div");
    const imagen = document.createElement("img");
    const nombre = document.createElement("h3");
    const tipos = document.createElement("div");
    const stats = document.createElement("div");
    const ataque = document.createElement("div");
    const defensa = document.createElement("div");
    const boton = document.createElement("button");

    tarjeta.classList.add("tarjeta", "tarjeta-neon");
    encabezado.classList.add("tarjeta-encabezado");
    numero.classList.add("pokemon-numero");
    imagenContenedor.classList.add("pokemon-imagen-contenedor");
    imagen.classList.add("pokemon-imagen");
    nombre.classList.add("pokemon-nombre");
    tipos.classList.add("pokemon-tipos");
    stats.classList.add("pokemon-estadisticas");
    ataque.classList.add("pokemon-stat", "stat-ataque");
    defensa.classList.add("pokemon-stat", "stat-defensa");

    boton.classList.add("pokemon-boton");
    boton.classList.add(esFavorito ? "boton-eliminar" : "boton-favorito");

    tarjeta.dataset.nombre = pokemon.name;

    numero.textContent = `POKÉDEX #${String(pokemon.id).padStart(3, "0")}`;

    imagen.src =
        pokemon.sprites?.other?.["official-artwork"]?.front_default ||
        pokemon.sprites?.front_default ||
        "";

    imagen.alt = pokemon.name;
    imagen.loading = "lazy";

    nombre.textContent = pokemon.name.toUpperCase();

    pokemon.types.forEach(tipo => {
        const etiqueta = document.createElement("span");
        etiqueta.classList.add("pokemon-tipo");
        etiqueta.textContent = tipo.type.name.toUpperCase();
        tipos.append(etiqueta);
    });

    ataque.innerHTML = `
        <span class="stat-icon">⚔</span>
        <span class="stat-label">ATAQUE</span>
        <strong>${pokemon.stats[1].base_stat}</strong>
    `;

    defensa.innerHTML = `
        <span class="stat-icon">🛡</span>
        <span class="stat-label">DEFENSA</span>
        <strong>${pokemon.stats[2].base_stat}</strong>
    `;

    boton.type = "button";
    boton.textContent = esFavorito
        ? "✕ ELIMINAR"
        : "♡ AGREGAR A FAVORITOS";

    if (esFavorito) {
        boton.addEventListener("click", () => {
            if (onEliminarFavorito) {
                onEliminarFavorito(pokemon.id);
            }
        });
    } else {
        boton.addEventListener("click", () => {
            if (onAgregarFavorito) {
                onAgregarFavorito(pokemon);
            }
        });
    }

    encabezado.append(numero);
    imagenContenedor.append(imagen);

    stats.append(ataque, defensa);

    tarjeta.append(
        encabezado,
        imagenContenedor,
        nombre,
        tipos,
        stats,
        boton
    );

    return tarjeta;
}