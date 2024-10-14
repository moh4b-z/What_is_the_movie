


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



//função para escolher um filme "aleatorio"
