
var anoAtual = new Date().getFullYear()

var instructionButton = document.querySelector('.instructionButton')
var onButton = document.querySelector('.onButton')


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

Description.style.display = 'none'
tipBox.style.display = 'none'

onButton.addEventListener('click', function() {
    if(instructionButton.style.display == 'flex'){
        instructionButton.style.display = 'none'
    }else{
        instructionButton.style.display = 'flex'
    }
})

document.addEventListener('click', function (event) {
    // Verifica se o clique foi fora do aviso e fora do botão que abre o aviso
    if (!instructionButton.contains(event.target) && !onButton.contains(event.target)) {
        instructionButton.style.display = 'none';
    }
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