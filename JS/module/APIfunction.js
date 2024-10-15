
//pegar as descrição do filme ou serie
async function descMovie(titulo) {
 
    let movieTitle = titulo

    const apiKey = '8f23043c'

    // URL da API OMDb para buscar informações do filme, com o título do filme codificado para a URL
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`
    
    try {
        // Realiza a requisição HTTP à URL da API OMDb
        const response = await fetch(url)
        
        // Converte a resposta da API em formato JSON
        const data = await response.json()
        
        if (data.Response === "True") {
            // console.log("Título:", data.Title)
            // console.log("Ano de Lançamento:", data.Year)
            // console.log("Data de Lançamento:", data.Released)
            // console.log("Tempo de duração:", data.Runtime)

            // console.log("Diretor:", data.Director)
            // console.log("Roterista/escritor:", data.Writer)
            // console.log("Atores:", data.Actors)

            // console.log("Gênero:", data.Genre)
            // console.log("País:", data.Country)
            // console.log("Avaliações:", data.Ratings)
            // console.log("Descrição", data.Plot)
            // console.log("Belheteria:", data.BoxOffice)

            // console.log("Pôster:", data.Poster)
            return {
                title: data.Title,          // Título
                released: data.Released,    // Data de lançamento
                runtime: data.Runtime,      // Duração
                director: data.Director,    // Diretor
                writer: data.Writer,        // Roteirista
                actors: data.Actors,        // Elenco
                genre: data.Genre,          // Gênero
                country: data.Country,      // País de origem
                ratings: data.Ratings,      // Avaliações
                plot: data.Plot,            // Descrição
                boxOffice: data.BoxOffice,  // Bilheteria
                production: data.Production,// Produtora
                poster: data.Poster         // URL do pôster
            }
        } else {
            console.log("Erro:", data.Error)
            return null // Retorna 'null' se não encontrar o filme
        }
    } catch (error) {
        // Captura e exibe qualquer erro que ocorra durante a requisição
        console.error("Erro na requisição:", error)
        return null // Retorna 'null' se houver erro na requisição
    }
}
const apiKey = '574110c6eea0bc0675c6fbc0375d87a8'
async function RandomMovie(genre, startYear, endYear) {
    if (endYear < startYear) {
        endYear = startYear
    }

    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`

    // Se o gênero não for 'NoGender', adicione o parâmetro de gênero à URL
    if (genre !== 'NoGender') {
        let genreId = await getGenreId(genre) // Obtenha o ID do gênero
        if (genreId) {
            apiUrl += `&with_genres=${genreId}`
        }
    }

    let response = await fetch(apiUrl)
    
    if (!response.ok) { 
        console.error('Erro na requisição:', response.statusText)
        return 'Erro ao buscar filmes.'
    }
    let information = await response.json()


    if (information.results.length > 0) {
        let randomIndex = Math.floor(Math.random() * information.results.length)
        return information.results[randomIndex].title
    } else {
        return 'Nenhum filme encontrado com esses critérios.'
    }
}
// Função auxiliar para obter o ID do gênero a partir de seu nome
async function getGenreId(genreName) {

    let genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`

    let response = await fetch(genreUrl)
    
    if (!response.ok) { // Verifique se a resposta é OK
        console.error('Erro na requisição de gêneros:', response.statusText)
        return null
    }

    let data = await response.json()
    let genre = data.genres.find(g => g.name.toLowerCase() === genreName.toLowerCase())

    return genre ? genre.id : null
}

export { descMovie, RandomMovie}