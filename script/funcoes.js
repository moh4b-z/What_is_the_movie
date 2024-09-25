// const { title, year, released, runtime, director, writer, actors, genre, country, ratings, plot, boxOffice, production, poster } = descMovie;

const APIIMDB = require('./funcoesParaAPI')

function compararFilmes(filme1, filme2) {
    return {
        title: compararCampos(filme1.title, filme2.title),
        released: compararCampos(filme1.released, filme2.released),
        runtime: compararCampos(filme1.runtime, filme2.runtime),
        director: compararMultiplosCampos(filme1.director, filme2.director),
        writer: compararMultiplosCampos(filme1.writer, filme2.writer),
        actors: compararMultiplosCampos(filme1.actors, filme2.actors),
        genre: compararMultiplosCampos(filme1.genre, filme2.genre),
        country: compararMultiplosCampos(filme1.country, filme2.country),
        ratings: compararRatings(filme1.ratings, filme2.ratings),
        boxOffice: compararCampos(filme1.boxOffice, filme2.boxOffice),
        production: compararCampos(filme1.production, filme2.production)
    }
}

function compararCampos(campo1, campo2) {
    if (!campo1 || !campo2) return null
    return campo1 === campo2 ? true : false
}

function compararMultiplosCampos(campo1, campo2) {
    if (!campo1 || !campo2) return null
    const lista1 = campo1.split(',').map(e => e.trim())
    const lista2 = campo2.split(',').map(e => e.trim())
    return lista1.some(item => lista2.includes(item)) ? true : false
}

function compararRatings(ratings1, ratings2) {
    if (!ratings1 || !ratings2) return null
    const imdbRating1 = ratings1.find(rating => rating.Source === "Internet Movie Database")
    const imdbRating2 = ratings2.find(rating => rating.Source === "Internet Movie Database")
    if (!imdbRating1 || !imdbRating2) return null
    return imdbRating1.Value === imdbRating2.Value ? true : false
}

// Função que busca os filmes e retorna um array com os dois filmes
async function chegarVariaveis(titulo1, titulo2) {
    let filme1 = await APIIMDB.descMovie(titulo1)
    let filme2 = await APIIMDB.descMovie(titulo2)

    if (filme1 && filme2) {
        return [filme1, filme2]; // Retorna um array com os dois filmes
    } else {
        console.error("Erro ao buscar informações dos filmes")
        return null
    }
}

// Chama a função chegarVariaveis e compara os filmes
chegarVariaveis('The Fast and the Furious', 'Planet of the Apes')
    .then(([filme1, filme2]) => {
        if (filme1 && filme2) {
            console.log(compararFilmes(filme1, filme2))
        }
    })
    .catch(err => {
        console.error("Erro ao comparar filmes", err)

    })
