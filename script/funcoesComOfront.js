let debounceTimer;

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value; // Pega o valor digitado no input
    const suggestionsBox = document.getElementById('suggestionsBox');

    // Limpa o temporizador anterior
    clearTimeout(debounceTimer);

    // Define um novo temporizador para aguardar 0,5 segundos após a última tecla
    debounceTimer = setTimeout(async () => {
        // Só faz a requisição se o valor tiver pelo menos 3 letras
        if (query.length >= 3) {
            const apiKey = '';
            const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                // Limpa as sugestões anteriores
                suggestionsBox.innerHTML = '';

                if (data.Response === "True") {
                    // Loop pelos resultados e adiciona cada um nas sugestões
                    data.Search.forEach(result => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.textContent = result.Title;

                        const typeSpan = document.createElement('span');
                        typeSpan.classList.add('type');
                        typeSpan.textContent = ` (${result.Type === 'movie' ? 'Filme' : 'Série'})`;
                        suggestionItem.appendChild(typeSpan);

                        // Adiciona o item à lista de sugestões
                        suggestionsBox.appendChild(suggestionItem);

                        // Evento para preencher o campo com o nome selecionado
                        suggestionItem.addEventListener('click', () => {
                            document.getElementById('searchInput').value = result.Title;
                            suggestionsBox.innerHTML = ''; // Limpa as sugestões
                        });
                    });
                } else {
                    suggestionsBox.innerHTML = '<div>Nenhum resultado encontrado</div>';
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        } else {
            // Limpa as sugestões se o input for menor que 3 caracteres
            suggestionsBox.innerHTML = '';
        }
    }, 1000); // 1 segundos de debounce
});
