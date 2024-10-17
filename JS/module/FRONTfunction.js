function passaParaFront(objeto){
    let obj = objeto


    let h2title = document.querySelector('.h2title')
    h2title.textContent = obj.title.text

    let Released = document.querySelector('#Released')
    Released.style.borderColor = corFundo(obj.released.status)
    let pReleased = document.querySelector('.pReleased')
    let spanReleased = document.querySelector('.spanReleased')
    pReleased.textContent = obj.released.text
    spanReleased.textContent = obj.released.symbol


    let Runtime = document.querySelector('#Runtime')
    Runtime.style.borderColor = corFundo(obj.runtime.status)
    let pRuntime = document.querySelector('.pRuntime')
    let spanRuntime = document.querySelector('.spanRuntime')
    pRuntime.textContent = obj.runtime.text
    spanRuntime.textContent = obj.runtime.symbol
    
    obj.director.forEach(function(item, indice){
        if(indice == 0){
            let Director = document.querySelector('#Director')
            Director.style.borderColor = corFundo(item.status)
            let pDirector = document.querySelector('.pDirector')
            pDirector.textContent = item.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Director${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pDirector${indice}`)

            paragrafo.textContent = item.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('#allDirector')
            allDirector.appendChild(div);

            div.style.borderColor = corFundo(item.status)
        }
        
    })
    obj.writer.forEach(function(item, indice){
        if(indice == 0){
            let Writer = document.querySelector('#Writer')
            Writer.style.borderColor = corFundo(item.status)
            let pWriter = document.querySelector('.pWriter')
            pWriter.textContent = item.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Writer${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pWriter${indice}`)

            paragrafo.textContent = item.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('#allWriter')
            allDirector.appendChild(div);

            div.style.borderColor = corFundo(item.status)
        }
    })
    obj.actors.forEach(function(item, indice){
        if(indice == 0){
            let Actors = document.querySelector('#Actors')
            Actors.style.borderColor = corFundo(item.status)
            let pActors = document.querySelector('.pActors')
            pActors.textContent = item.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Actors${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pActors${indice}`)

            paragrafo.textContent = item.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('#allActors')
            allDirector.appendChild(div);


            div.style.borderColor = corFundo(item.status)
        }
    })
    obj.genre.forEach(function(item, indice){
        if(indice == 0){
            let Genre = document.querySelector('#Genre')
            Genre.style.borderColor = corFundo(item.status)
            let pGenre = document.querySelector('.pGenre')
            pGenre.textContent = item.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Genre${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pGenre${indice}`)

            paragrafo.textContent = item.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('#allGenre')
            allDirector.appendChild(div);


            div.style.borderColor = corFundo(item.status)
        }
    })
    obj.country.forEach(function(item, indice){
        if(indice == 0){
            let Country = document.querySelector('#Country')
            Country.style.borderColor = corFundo(item.status)
            let pCountry = document.querySelector('.pCountry')
            pCountry.textContent = item.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Country${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pCountry${indice}`)

            paragrafo.textContent = item.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('#allCountry')
            allDirector.appendChild(div);


            div.style.borderColor = corFundo(item.status)
        }
        
    })
    
    let Ratings = document.querySelector('#Ratings')
    Ratings.style.borderColor = corFundo(obj.ratings.status)
    let pRatings = document.querySelector('.pRatings')
    let spanRatings = document.querySelector('.spanRatings')
    pRatings.textContent = obj.ratings.text
    spanRatings.textContent = obj.ratings.symbol
    
    let boxOffice = document.querySelector('#BoxOffice')
    boxOffice.style.borderColor = corFundo(obj.boxOffice.status)
    let pBoxOffice = document.querySelector('.pBoxOffice')
    let spanBoxOffice = document.querySelector('.spanBoxOffice')
    pBoxOffice.textContent = obj.boxOffice.text
    spanBoxOffice.textContent = obj.boxOffice.symbol
    
    /*
    obj.production.forEach(function(item, indice){
        if(indice == 0){
            let Production = document.querySelector('#Production')
            Production.style.borderColor = corFundo(item.status)
            let pProduction = document.querySelector('.pProduction')
            pProduction.textContent = item.text
        }else{
            let div = document.createElement('div')

            div.classList.add('atributo')
            div.id = `Production${indice}`;

            let paragrafo = document.createElement('p')

            paragrafo.classList.add(`pProduction${indice}`)

            paragrafo.textContent = item.text


            div.appendChild(paragrafo);

            let allDirector = document.querySelector('#allProduction')
            allDirector.appendChild(div);


            div.style.borderColor = corFundo(item.status)
        }
        
    })
    */
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

function preencherAnos(select, startYear, endYear) {
    select.textContent = ''
    for (let year = startYear; year <= endYear; year++) {
        let option = document.createElement('option')
        option.value = year
        option.textContent = year
        select.appendChild(option)
    }
}

export { passaParaFront, preencherAnos}