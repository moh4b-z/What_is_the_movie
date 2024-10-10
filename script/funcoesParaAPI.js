


//pegar as descrição do filme ou serie
async function descMovie(titulo) {
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
            };
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
async function RandomMovie(tipo, genero = '', ano = '') {
    let type = tipo
    let yearFrom = ano || 1900 // Se o ano não for fornecido, será considerado a partir de 1900
    let saida = false
    const apiKey = '8f23043c'
    let results = []

    for (let i = 0; i < 5; i++) {
        // Se o ano não for fornecido, não calcula o randomYear
        const randomYear = ano ? Math.floor(Math.random() * (new Date().getFullYear() - yearFrom + 1)) + yearFrom : '';
        const randomPage = Math.floor(Math.random() * 100) + 1 // OMDb tem limite de 100 páginas

        // Constrói a URL com base no tipo, ano e página
        let url = `https://www.omdbapi.com/?type=${type}&page=${randomPage}&apikey=${apiKey}`;
        if (randomYear) url += `&y=${randomYear}` // Inclui o ano se disponível

        try {
            const response = await fetch(url)
            const data = await response.json()

            if (data.Response === "True") {
                results = data.Search // Armazena os resultados da busca
                break // Se tiver resultados, sai do loop
            } else {
                console.error("Erro na resposta da API:", data.Error); // Erro retornado pela API
            }
        } catch (error) {
            console.error("Erro na requisição:", error)
            break // Parar o loop ao encontrar um erro
        }
    }

    if (results.length > 0) {
        // Filtra filmes pelo gênero se o gênero for fornecido
        for (let result of results) {
            const detailedUrl = `https://www.omdbapi.com/?i=${result.imdbID}&apikey=${apiKey}`
            try {
                const detailedResponse = await fetch(detailedUrl)
                const detailedData = await detailedResponse.json()

                // Se o gênero foi fornecido, verifica se o gênero corresponde
                if (detailedData.Response === "True" && (genero === '' || detailedData.Genre.includes(genero))) {
                    console.log("Título Escolhido:", detailedData.Title)
                    console.log("Ano:", detailedData.Year)
                    console.log("Tipo:", detailedData.Type)
                    console.log("Gênero:", detailedData.Genre)
                    console.log("ID IMDb:", detailedData.imdbID)
                    console.log("Poster:", detailedData.Poster)

                    saida = detailedData.Title
                    break // Encerra após encontrar um filme válido
                }
            } catch (error) {
                console.error("Erro ao obter detalhes:", error)
            }
        }

        if (!saida) {
            console.log("Nenhum filme encontrado com os critérios fornecidos.")
        }
    } else {
        console.log("Nenhum título encontrado com os critérios fornecidos.")
    }

    return saida
}

export { descMovie, RandomMovie }

