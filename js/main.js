window.onload = () => {
    const peli_buscada = document.querySelector('#peli_input');
    const btnBuscar = document.querySelector('#buscar');
    const resultado = document.querySelector('#resultado');
    const apikey = '1d79f796c6692ab5bdf9b56156044b50';

    btnBuscar.addEventListener('click', () => {
        const pelicula = peli_buscada.value.toLowerCase().trim();

        if (pelicula === '') {
            resultado.innerHTML = '<p>Por favor ingresa una película</p>';
            return;
        }

        resultado.innerHTML = ''; // Limpiar resultados anteriores

        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(pelicula)}&include_adult=false&language=es-MX&page=1`;

        fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDc5Zjc5NmM2NjkyYWI1YmRmOWI1NjE1NjA0NGI1MCIsIm5iZiI6MTc0OTM2MjUyMy4wMjIsInN1YiI6IjY4NDUyNzViMmY1MTZkZmEyODFlYTM0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ajWRyhWsiiJ-1GjwEq7oVvP02cbRz95OFhtlXpyxY4M'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                resultado.innerHTML = '<p>No se encontraron resultados.</p>';
                return;
            }

            data.results.forEach(peli => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <h3>${peli.title}</h3>
                    <p>${peli.overview}</p>
                    <img src="https://image.tmdb.org/t/p/w200${peli.poster_path}" alt="${peli.title}">
                    <hr>
                `;
                resultado.appendChild(div);
            });
        })
        .catch(error => {
            resultado.innerHTML = '<p>Error al buscar la película.</p>';
            console.error('Error:', error);
        });
    });
}
