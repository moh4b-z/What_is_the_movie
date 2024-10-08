let debounceTimer

document.querySelector('.escolha').addEventListener('input', function () {
    const query = this.value // Pega o valor digitado no input
    const suggestionsBox = document.getElementById('suggestionsBox')

    // Limpa o temporizador anterior
    clearTimeout(debounceTimer)

    // Define um novo temporizador para aguardar 1 segundo após a última tecla
    debounceTimer = setTimeout(async () => {
        // Só faz a requisição se o valor tiver pelo menos 3 letras
        if (query.length >= 3) {
            const apiKey = '8f23043c'
            const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${apiKey}`

            try {
                const response = await fetch(url)
                const data = await response.json()

                // Limpa as sugestões anteriores
                suggestionsBox.textContent = ''

                if (data.Response === "True") {
                    // Loop pelos resultados e adiciona cada um nas sugestões
                    data.Search.forEach(result => {
                        const suggestionItem = document.createElement('div')
                        suggestionItem.textContent = result.Title

                        const releaseDateSpan = document.createElement('span')
                        releaseDateSpan.classList.add('release-date')
                        releaseDateSpan.textContent = ` (Lançamento: ${result.Year})` // Exibe o ano de lançamento
                        suggestionItem.appendChild(releaseDateSpan)

                        // Adiciona o item à lista de sugestões
                        suggestionsBox.appendChild(suggestionItem)

                        // Evento para preencher o campo com o nome selecionado
                        suggestionItem.addEventListener('click', () => {
                            document.getElementById('searchInput').value = result.Title
                            suggestionsBox.textContent = '' // Limpa as sugestões
                        })
                    })
                } else {
                    suggestionsBox.textContent = 'Nenhum resultado encontrado'
                }
            } catch (error) {
                console.error('Erro na requisição:', error)
            }
        } else {
            // Limpa as sugestões se o input for menor que 3 caracteres
            suggestionsBox.innerHTML = ''
        }
    }, 500) // 1 segundo de debounce
})

document.addEventListener('click', function (event) {
    const suggestionsBox = document.getElementById('suggestionsBox')
    const searchInput = document.getElementById('searchInput')

    // Verifica se o clique foi fora da caixa de sugestões e do campo de busca
    if (!suggestionsBox.contains(event.target) && event.target !== searchInput) {
        suggestionsBox.textContent = ''// Limpa as sugestões
    }
})