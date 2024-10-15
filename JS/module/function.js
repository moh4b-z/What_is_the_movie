// const { title, year, released, runtime, director, writer, actors, genre, country, ratings, plot, boxOffice, production, poster } = descMovie
import {descMovie, RandomMovie} from './APIfunction.js'


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

    // // Comparação de production
    // resultado.production = compararListasParaObjeto(obj1.production.split(', '), obj2.production.split(', '), 'production')

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

function compararListasParaObjeto(array1, array2, Campo) {
    let lista1 = array1
    let lista2 = array2
    let nomeCampo = Campo
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

function getImdbRating(avaliacao) {
    let ratings = avaliacao
    if (!ratings || ratings === 'N/A') {
        return null
    }
    const imdbRating = ratings.find(rating => rating.Source === 'Internet Movie Database')
    return imdbRating ? imdbRating.Value : null
}

async function compararFilmesTeste() {
    let titulo1 = await descMovie('Iron Man 2')
    let titulo2 = await descMovie('Iron Man')

    const resultadoComparacao = ComparacaoDeFilme(titulo1, titulo2)
    return resultadoComparacao
}
// Executando a função de comparação
async function executarComparacao() {
    let resultado = await compararFilmesTeste()
    console.log(resultado)
}

executarComparacao()


async function compararFilmes(FilmeMaquina, FilmeUsuario) {
    let titulo1 = FilmeMaquina
    let titulo2 = await descMovie(FilmeUsuario)

    let resultadoComparacao = ComparacaoDeFilme(titulo1, titulo2)
    return resultadoComparacao
}

async function desistir(FilmeMaquina) {
    let titulo1 = FilmeMaquina
    let resultadoComparacao = ComparacaoDeFilme(titulo1, titulo1)
    return resultadoComparacao
}

async function certaintyRandomMovie(genre, startYear, endYear) {
    let filme
    let descricao

    do {
        filme = await RandomMovie(genre, startYear, endYear)
        console.log(`Filme encontrado: ${filme}`)
        descricao = await descMovie(filme)

        // Se a descrição for null, significa que não encontrou o filme
        if (descricao) {
            // console.log(`Descrição encontrada: 
            //     ${descricao}`)
            return descricao
        } else {
            console.log(`Tentando novamente...`)
        }
    } while (!descricao) // Continua enquanto a descrição for null
}

export { compararFilmes, certaintyRandomMovie, desistir}