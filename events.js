// Tarea 6: Configurar Event Listeners
btnBuscar.addEventListener('click', async () => {
    const nombre = inputPokemon.value.trim();
    if (nombre === '') {
        alert('Por favor, ingresa un nombre.');
        return;
    }
    
    // Limpiar resultado anterior
    resultadoBusqueda.innerHTML = ''; 
    
    const pokemon = await fetchPokemon(nombre);
    if (pokemon) {
        crearTarjeta(pokemon, resultadoBusqueda, false);
    }
});

btnLimpiar.addEventListener('click', () => {
    inputPokemon.value = '';
    resultadoBusqueda.innerHTML = '';
});

// Inicialización
document.addEventListener('DOMContentLoaded', cargarFavoritosIniciales);