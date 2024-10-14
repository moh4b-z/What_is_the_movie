export function preencherAnos(select, startYear, endYear) {
    select.textContent = ''
    for (let year = startYear; year <= endYear; year++) {
        let option = document.createElement('option')
        option.value = year
        option.textContent = year
        select.appendChild(option)
    }
}