// const { title, year, released, runtime, director, writer, actors, genre, country, ratings, plot, boxOffice, production, poster } = descMovie;

const APIIMDB = require('./funcoesParaAPI')


function ComparacaoDeFilme(objeto1, objeto2) {
    let obj1 = objeto1
    let obj2 = objeto2
    const resultado = {}

    // Comparação dos campos especificados
    resultado.title = obj1.title && obj2.title
        ? { status: (obj1.title === obj2.title), text: obj2.title }
        : { status: null, text: 'Um ou ambos os títulos estão vazios' }

    resultado.released = compararNumerosOuDatas(obj1.released, obj2.released, 'released')
    resultado.runtime = compararNumerosOuDatas(obj1.runtime, obj2.runtime, 'runtime')

    resultado.director = compararListasParaObjeto(obj1.director.split(', '), obj2.director.split(', '), 'director')
    resultado.writer = compararListasParaObjeto(obj1.writer.split(', '), obj2.writer.split(', '), 'writer')
    resultado.actors = compararListasParaObjeto(obj1.actors.split(', '), obj2.actors.split(', '), 'actors')
    resultado.genre = compararListasParaObjeto(obj1.genre.split(', '), obj2.genre.split(', '), 'genre')
    resultado.country = compararListasParaObjeto(obj1.country.split(', '), obj2.country.split(', '), 'country')

    // Comparação de ratings (somente do IMDb)
    const imdbRating1 = getImdbRating(obj1.ratings)
    const imdbRating2 = getImdbRating(obj2.ratings)
    resultado.ratings = compararNumerosOuDatas(imdbRating1, imdbRating2, 'ratings')

    // Comparação de boxOffice
    resultado.boxOffice = compararNumerosOuDatas(obj1.boxOffice, obj2.boxOffice, 'boxOffice')

    // Comparação de production
    resultado.production = compararListasParaObjeto(obj1.production.split(', '), obj2.production.split(', '), 'production')

    return resultado
}
function compararNumerosOuDatas(valor1, valor2, Campo) {
    let val1 = valor1
    let val2 = valor2
    let nomeCampo = Campo
    if (!val1 || val1 === 'N/A') val1 = null
    if (!val2 || val2 === 'N/A') val2 = null

    if (!val1 && !val2) {
        return { status: null, text: `Os dois campos de ${nomeCampo} estão vazios`, symbol: '---' }
    }
    if (!val1) {
        return { status: null, text: `O ${nomeCampo} do primeiro objeto está vazio`, symbol: '---' }
    }
    if (!val2) {
        return { status: null, text: `O ${nomeCampo} do segundo objeto está vazio`, symbol: '---' }
    }
    if (val1 === val2) {
        return { status: true, text: val2, symbol: '=' }
    } else {
        return { status: false, text: val2, symbol: val1 > val2 ? '<' : '>' }
    }
}

function compararListasParaObjeto(lista1, lista2, nomeCampo) {
    if ((!lista1 || lista1.includes('N/A')) && (!lista2 || lista2.includes('N/A'))) {
        return [{ status: null, text: `Os dois campos de ${nomeCampo} estão vazios` }]
    }
    if (!lista1 || lista1.includes('N/A')) {
        return [{ status: null, text: `O ${nomeCampo} do primeiro objeto está vazio` }]
    }
    if (!lista2 || lista2.includes('N/A')) {
        return [{ status: null, text: `O ${nomeCampo} do segundo objeto está vazio` }]
    }

    const resultadoLista = lista2.map(item => ({
        status: lista1.includes(item),
        text: item
    }))

    return resultadoLista
}

// Extrair a avaliação do IMDb dos ratings
function getImdbRating(ratings) {
    if (!ratings || ratings === 'N/A') {
        return null
    }
    const imdbRating = ratings.find(rating => rating.Source === 'Internet Movie Database')
    return imdbRating ? imdbRating.Value : null
}

async function compararFilmes() {
    let titulo1 = await APIIMDB.descMovie('Iron Man 2')
    let titulo2 = await APIIMDB.descMovie('Iron Man')

    const resultadoComparacao = ComparacaoDeFilme(titulo1, titulo2)
    return resultadoComparacao
}

async function compararFilmesCertos(FilmeMaquina, FilmeUsuario) {
    let titulo1 = FilmeMaquina
    let titulo2 = await APIIMDB.descMovie(FilmeUsuario)

    const resultadoComparacao = ComparacaoDeFilme(titulo1, titulo2)
    return resultadoComparacao
}

// Executando a função de comparação
async function executarComparacao() {
    let resultado = await compararFilmes()
    console.log(resultado)
}

executarComparacao()


function passaParaFront(objeto){
    let obj = objeto

    let title = document.querySelector('#title')
    Released.style.backgroundColor = corFundo(obj.title.status)
    let h2title = document.querySelector('.h2title')
    h2title.textContent = obj.title.text

    let Released = document.querySelector('#Released')
    Released.style.backgroundColor = corFundo(obj.released.status)
    let pReleased = document.querySelector('.pReleased')
    let spanReleased = document.querySelector('.spanReleased')
    pReleased.textContent = obj.released.text
    spanReleased.textContent = obj.released.symbol


    let Runtime = document.querySelector('#Runtime')
    Runtime.style.backgroundColor = corFundo(obj.runtime.status)
    let pRuntime = document.querySelector('.pRuntime')
    let spanRuntime = document.querySelector('.spanRuntime')
    pRuntime.textContent = obj.runtime.text
    spanRuntime.textContent = obj.runtime.symbol
    
    obj.director.forEach(function(item, indice){
        if(indice == 0){
            let Director = document.querySelector('#Director')
            Director.style.backgroundColor = corFundo(item.status)
            let pDirector = document.querySelector('.pDirector')
            pDirector.textContent = obj.director.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Director${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pDirector${indice}`)

            paragrafo.textContent = obj.director.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('.allDirector')
            document.allDirector.appendChild(div);


            div.style.backgroundColor = corFundo(item.status)
        }
        
    })
    obj.writer.forEach(function(item, indice){
        if(indice == 0){
            let Writer = document.querySelector('#Writer')
            Writer.style.backgroundColor = corFundo(item.status)
            let pWriter = document.querySelector('.pWriter')
            pWriter.textContent = obj.writer.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Writer${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pWriter${indice}`)

            paragrafo.textContent = obj.director.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('.allWriter')
            document.allDirector.appendChild(div);


            div.style.backgroundColor = corFundo(item.status)
        }
    })
    obj.actors.forEach(function(item, indice){
        if(indice == 0){
            let Actors = document.querySelector('#Actors')
            Actors.style.backgroundColor = corFundo(item.status)
            let pActors = document.querySelector('.pActors')
            pActors.textContent = obj.actors.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Actors${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pActors${indice}`)

            paragrafo.textContent = obj.director.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('.allActors')
            document.allDirector.appendChild(div);


            div.style.backgroundColor = corFundo(item.status)
        }
    })
    obj.genre.forEach(function(item, indice){
        if(indice == 0){
            let Genre = document.querySelector('#Genre')
            Genre.style.backgroundColor = corFundo(item.status)
            let pGenre = document.querySelector('.pGenre')
            pGenre.textContent = obj.genre.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Genre${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pGenre${indice}`)

            paragrafo.textContent = obj.director.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('.allGenre')
            document.allDirector.appendChild(div);


            div.style.backgroundColor = corFundo(item.status)
        }
    })
    obj.country.forEach(function(item, indice){
        if(indice == 0){
            let Country = document.querySelector('#Country')
            Country.style.backgroundColor = corFundo(item.status)
            let pCountry = document.querySelector('.pCountry')
            pCountry.textContent = obj.country.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Country${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pCountry${indice}`)

            paragrafo.textContent = obj.director.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('.allCountry')
            document.allDirector.appendChild(div);


            div.style.backgroundColor = corFundo(item.status)
        }
        
    })
    
    let Ratings = document.querySelector('#Ratings')
    Ratings.style.backgroundColor = corFundo(obj.ratings.status)
    let pRatings = document.querySelector('.pRatings')
    let spanRatings = document.querySelector('.spanRatings')
    pRatings.textContent = obj.ratings.text
    spanRatings.textContent = obj.ratings.symbol
    
    let boxOffice = document.querySelector('#boxOffice')
    boxOffice.style.backgroundColor = corFundo(obj.boxOffice.status)
    let pBoxOffice = document.querySelector('.pBoxOffice')
    let spanBoxOffice = document.querySelector('.spanBoxOffice')
    pBoxOffice.textContent = obj.boxOffice.text
    spanBoxOffice.textContent = obj.boxOffice.symbol
    

    obj.production.forEach(function(item, indice){
        if(indice == 0){
            let Production = document.querySelector('#Production')
            Production.style.backgroundColor = corFundo(item.status)
            let pProduction = document.querySelector('.pProduction')
            pProduction.textContent = obj.production.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Production${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pProduction${indice}`)

            paragrafo.textContent = obj.director.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('.allProduction')
            document.allDirector.appendChild(div);


            div.style.backgroundColor = corFundo(item.status)
        }
        
    })
}

function corFundo(valor){
    let resposta = "var(--color-padrao-sugestao)"
    if(valor){
        resposta = "var(--color-acerto-sugestao)"
    }else if(!valor){
        resposta = "var(--color-erro-sugestao)"
    }else if(valor === null){
        resposta
    }
    return resposta
}


module.exports = {
    passaParaFront,
    compararFilmes
}
