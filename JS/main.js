import {passaParaFront, preencherAnos} from './module/FRONTfunction.js'
import {compararFilmes, certaintyRandomMovie, desistir} from './module/function.js'

var anoAtual = new Date().getFullYear()

var inputEscolha = document.querySelector('.escolha')

var play = document.querySelector('.play')
var GiveUp = document.querySelector('.GiveUp')
var playArea = document.querySelector('.playArea')

var tipBox = document.querySelector('.tipBox')
var imgTip = document.querySelector('.tipBox > img')
var buttonTip = document.querySelector('.tipBox > button')

var Description = document.querySelector('.Description')
var imgDescription = document.querySelector('.Description > img')
var h4Description = document.querySelector('.Description > h4')
var spanDescription = document.querySelector('.Description > span')
var pDescription = document.querySelector('.Description > p')

var MovieGenre = document.getElementById('MovieGenre')
var startingYear = document.getElementById('startingYear')
var finalYear = document.getElementById('finalYear')


let debounceTimer
inputEscolha.addEventListener('input', function () {
    let query = this.value // Pega o valor digitado no input
    let suggestionsBox = document.getElementById('suggestionsBox')

    // Limpa o temporizador anterior
    clearTimeout(debounceTimer)

    // Define um novo temporizador para aguardar 1 segundo após a última tecla
    debounceTimer = setTimeout(async () => {
        // Só faz a requisição se o valor tiver pelo menos 3 letras
        if (query.length >= 3) {
            let apiKey = '8f23043c'
            let url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${apiKey}`

            try {
                let response = await fetch(url)
                let data = await response.json()

                // Limpa as sugestões anteriores
                suggestionsBox.textContent = ''

                if (data.Response === "True") {
                    // Loop pelos resultados e adiciona cada um nas sugestões
                    data.Search.forEach(result => {
                        let suggestionItem = document.createElement('div')
                        suggestionItem.textContent = result.Title

                        let releaseDateSpan = document.createElement('span')
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
            suggestionsBox.textContent = ''
        }
    }, 500)
})

document.addEventListener('click', function (event) {
    let suggestionsBox = document.getElementById('suggestionsBox')
    let searchInput = document.getElementById('searchInput')

    // Verifica se o clique foi fora da caixa de sugestões e do campo de busca
    if (!suggestionsBox.contains(event.target) && event.target !== searchInput) {
        suggestionsBox.textContent = ''
    }
})

play.addEventListener('click', async function() {
    var MovieGValue = MovieGenre.value
    var sYearValue = Number(startingYear.value)
    var fYearValue = Number(finalYear.value)

    playArea.style.display = 'none'
    GiveUp.style.display = 'flex'
    tipBox.style.display = 'flex'
    inputEscolha.style.display = 'flex'

    let filmeMaquina = await certaintyRandomMovie(MovieGValue, sYearValue, fYearValue)
    let poster = filmeMaquina.poster
    let title = filmeMaquina.title
    let released = filmeMaquina.released
    let plot = filmeMaquina.plot

    imgTip.src = poster

    imgDescription.src = poster
    h4Description.textContent = title
    spanDescription.textContent = released
    pDescription.textContent = plot
    let derrota = await desistir(filmeMaquina)
    let blur = 25
    imgDescription.style.display = 'none'
    h4Description.style.display = 'none'
    spanDescription.style.display = 'none'

    buttonTip.addEventListener('click', function() {
        if(blur != 5){
            blur -= 5
            imgTip.style.filter = `blur(${blur}px)`
            imgTip.style.display = 'flex'
        }else{
            buttonTip.style.display = 'none'
            Description.style.display = 'flex'
        }  
    })

    GiveUp.addEventListener('click', async function() {
        imgDescription.style.display = 'flex'
        h4Description.style.display = 'flex'
        spanDescription.style.display = 'flex'
        if(GiveUp.textContent == 'Give Up'){
            tipBox.style.display = 'none'
            inputEscolha.style.display = 'none'

            GiveUp.style.animation = 'indicativo 2s infinite'
            GiveUp.textContent = 'Play again'
            Description.style.display = 'flex'
            
            passaParaFront(derrota)
            
        }else if(GiveUp.textContent == 'Play again'){
            location.reload()
        }     
    })
    inputEscolha.addEventListener('keydown', async function(event) {
        
        if (event.key === 'Enter') {

            let valorEscolhido = inputEscolha.value
            
            let resultado = await compararFilmes(filmeMaquina, valorEscolhido)
            passaParaFront(resultado)
            if(resultado.title.status && resultado.released.status){
                tipBox.style.display = 'none'
                inputEscolha.style.display = 'none'

                GiveUp.style.animation = 'indicativo 2s infinite'
                GiveUp.textContent = 'Play again'
                Description.style.display = 'flex'
            }
            
            inputEscolha.value = ''
        }
    })
})

preencherAnos(startingYear, 1900, anoAtual)
preencherAnos(finalYear, 1900, anoAtual)


startingYear.value = 2000
finalYear.value = anoAtual

startingYear.addEventListener('change', function() {
    var anoSelecionado = parseInt(this.value)
    preencherAnos(finalYear, anoSelecionado, anoAtual)
    finalYear.value = anoSelecionado <= anoAtual ? anoAtual : anoSelecionado
})