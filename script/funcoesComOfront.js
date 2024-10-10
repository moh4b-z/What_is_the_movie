
let debounceTimer

var inputEscolha = document.querySelector('.escolha')

inputEscolha.addEventListener('input', function () {
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

                        
                        suggestionsBox.appendChild(suggestionItem)

                        // Evento para preencher o campo com o nome selecionado
                        suggestionItem.addEventListener('click', () => {
                            inputEscolha.value = result.Title
                            suggestionsBox.textContent = '' 
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
            suggestionsBox.textContent = ''
        }
    }, 500)
})

document.addEventListener('click', function (event) {
    const suggestionsBox = document.getElementById('suggestionsBox')
    const searchInput = document.getElementById('searchInput')

    // Verifica se o clique foi fora da caixa de sugestões e do campo de busca
    if (!suggestionsBox.contains(event.target) && event.target !== searchInput) {
        suggestionsBox.textContent = ''// Limpa as sugestões
    }
})

var aviso = document.querySelector('.aviso')
var sobre = document.querySelector('.sobre')
sobre.addEventListener('click', function() {

    if(aviso.style.display == 'flex'){
        aviso.style.display = 'none'
    }else{
        aviso.style.display = 'flex'
    }

})


var play = document.querySelector('.play')


play.addEventListener('click', function() {
    inputEscolha.addEventListener('keydown', function(event) {
        
        if (event.key === 'Enter') {

            let valorEscolhido = inputEscolha.value
    
            console.log('Valor guardado: ', valorEscolhido)
            
            //limpar o campo de input após capturar o valor
            inputEscolha.value = ''
        }
    })
})