const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'
function obterFilmes(){
  // operador de interpolação
  const url = `${protocolo}${baseURL}${filmesEndpoint}`
  console.log(url)
  console.log('Testando...')
}