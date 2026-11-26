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