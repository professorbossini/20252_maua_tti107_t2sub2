const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'
async function obterFilmes(){
  // operador de interpolação
  //http://localhost:3000
  const url = `${protocolo}${baseURL}${filmesEndpoint}`
  const filmes = (await axios.get(url)).data
  // console.log(filmes)
  const tabela = document.querySelector('.filmes')
  const corpoDaTabela = tabela.getElementsByTagName('tbody')[0]
  for (let filme of filmes){
    const linha = corpoDaTabela.insertRow()
    const celulaTitulo = linha.insertCell(0)
    const celulaSinopse = linha.insertCell(1)
    celulaTitulo.innerHTML = filme.titulo
    celulaSinopse.innerHTML = filme.sinopse
  }


}

async function cadastrarFilme(){
  const url = `${protocolo}${baseURL}${filmesEndpoint}`
  const tituloInput = document.querySelector('#tituloInput')
  const sinopseInput = document.querySelector('#sinopseInput')
  const titulo = tituloInput.value
  const sinopse = sinopseInput.value
  if(titulo && sinopse){
    // const filme = {titulo: titulo, sinopse: sinopse}
    const token = fweklajfçwleaj
    const filme = {titulo, sinopse}
    tituloInput.value = ''
    sinopseInput.value = ''
    const filmes = (await axios.post(url, filme)).data
    const tabela = document.querySelector('.filmes')
    const corpoDaTabela = tabela.getElementsByTagName('tbody')[0]
    corpoDaTabela.innerHTML = ""
    for(let filme of filmes){
      const linha = corpoDaTabela.insertRow(0)
      const celulaTitulo = linha.insertCell(0)
      const celulaSinopse = linha.insertCell(1)
      celulaTitulo.innerHTML = filme.titulo
      celulaSinopse.innerHTML = filme.sinopse
    }
  }
  else{
    const alert = document.querySelector('.alert')
    alert.classList.add('show')
    alert.classList.remove('d-none')
    setTimeout(() => {
      alert.classList.remove('show')
      alert.classList.add('d-none')  
    }, 2000)
  }
}

