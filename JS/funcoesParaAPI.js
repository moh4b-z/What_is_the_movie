


//pegar as descrição do filme ou serie
export async function descMovie(titulo) {
    // Armazena o título do filme na variável 'movieTitle' 
    let movieTitle = titulo

    // Chave de API do OMDb para autenticação
    const apiKey = '8f23043c'

    // URL da API OMDb para buscar informações do filme, com o título do filme codificado para a URL
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`
    
    try {
        // Realiza a requisição HTTP à URL da API OMDb
        const response = await fetch(url)
        
        // Converte a resposta da API em formato JSON
        const data = await response.json()
        
        // Verifica se a resposta da API foi bem-sucedida (data.Response === "True")
        if (data.Response === "True") {
            // Exibe as informações do filme no console
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

            // Retorna um objeto com todas as informações detalhadas do filme
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
            // Se a resposta da API não for bem-sucedida, exibe o erro retornado pela API
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

    // Fazendo a requisição para a API e obtendo os filmes
    let response = await fetch(apiUrl)
    
    if (!response.ok) { 
        console.error('Erro na requisição:', response.statusText)
        return 'Erro ao buscar filmes.'
    }
    let information = await response.json()


    if (information.results.length > 0) {
        let randomIndex = Math.floor(Math.random() * information.results.length)
        return information.results[randomIndex].title// Retorna apenas o nome do filme
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

export async function ativarComRepeticao(genre, startYear, endYear) {
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

// Chame a função ativarComRepeticao() para iniciar o processo
// ativarComRepeticao('Animation', 2000, 2024);

