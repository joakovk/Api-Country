const main = document.querySelector('main')
const search = document.getElementById('input')
const button = document.getElementById('search')


// Promise.all([
//   fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags"),
//   fetch("https://restcountries.com/v3.1/all?fields=population,region"),
// ])
//   .then(responses => Promise.all(responses.map(res => res.json())))
//   .then(([data1, data2]) => {
//     data2.forEach((object, index) =>{
//         data1[index].population = object.population
//         data1[index].region = object.region
//     })

//     data1.sort((a, b) => a.name.common.localeCompare(b.name.common))
//     data1.forEach(pais => {
//         console.log(pais)
//         createInfo(pais)
//     })
//   })
//   .catch(err => console.error("Error en alguno de los fetchs:", err))
fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,cca2,languages,currencies,timezones")
  .then(res => res.json()) // ✅ acá estaba el error
  .then((data1) => {
    // Ordenar alfabéticamente por nombre común
    data1.sort((a, b) => a.name.common.localeCompare(b.name.common));

    // Recorrer los países y mostrar info
    data1.forEach(pais => {
      console.log(pais); // ✅ ahora sí podés acceder a cca2
      createInfo(pais);
    });
  })
  .catch(err => console.error("Error en alguno de los fetchs:", err));

function createInfo(pais){
    const languagesInfo = pais.languages ? Object.values(pais.languages).join(", ") : "No disponible"
    const currenciesInfo = pais.currencies ? Object.values(pais.currencies).map(c => `${c.name} (${c.symbol})`).join(", ") : "No disponible";
    const timezonesInfo = pais.timezones ? Object.values(pais.timezones).join(", ") : "No disponible"
    const div = document.createElement('div')
    div.className = 'div-pais'
    main.appendChild(div)
    const img = document.createElement('img')
    img.className = 'image'
    img.src = pais.flags.svg
    div.appendChild(img)
    const info = document.createElement('div')
    info.className = 'info'
    div.appendChild(info)
    const name = document.createElement('strong')
    name.className = 'name'
    name.innerText = pais.name.common
    info.appendChild(name)
    const Code = document.createElement('p')
    Code.innerText = 'Code: ' + pais.cca2
    info.appendChild(Code)
    const capital = document.createElement('p')
    capital.innerText = 'Capital: ' + pais.capital[0]
    info.appendChild(capital)
    const region = document.createElement('p')
    region.innerText = 'Region: ' + pais.region
    info.appendChild(region) 
    const languages = document.createElement('p')
    languages.innerText = 'Languages: ' + languagesInfo
    info.appendChild(languages)
    const population = document.createElement('p')
    population.innerText = 'Population: ' + pais.population
    info.appendChild(population)
    const currencies = document.createElement('p')
    currencies.innerText = 'Currencies: ' + currenciesInfo
    info.appendChild(currencies)
    const timezones = document.createElement('p')
    timezones.innerText = 'Timezones: ' + timezonesInfo
    info.appendChild(timezones)
    

}


button.addEventListener('click', () => {
    console.log('Entro')
    const term = search.value.toLowerCase().trim()
    let divs = main.querySelectorAll('.div-pais')
    divs.forEach(div =>{
        let text = div.querySelector('.info strong').textContent.toLowerCase()
        if (term === '' || text.includes(term)) {
            div.style.display = 'flex'
        } else {
            div.style.display = 'none'
        }
    })
})
