const express = require('express')
const app = express()
//aplicando uma função middleware
app.use(express.json())
const filmes = [
  {
    titulo: 'Interestelar',
    sinopse: 'Viagem no espaço com salvamento da humidade.'
  }
]

app.get('/hey', (req, res) => {
  console.log('Endpoint acionado(GET)...')
  res.send('hey')
})

//defina um endpoint assim:
//POST /oi
//que devolve: oi, tudo bem?
app.post('/oi', (req, res) => {
  console.log('Endpoint acionado(POST)....')
  res.send('oi, tudo bem?')
})


app.get('/filmes', (req, res) => {
  res.json(filmes)  
})

/*
req = {
  body:{
    titulo: 'Piratas do Caribe',
    sinopse: 'Aventura de piratas'
  }
}
*/
app.post('/filmes', (req, res) => {
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse
  const filme = {
    titulo: titulo,
    sinopse: sinopse
  }
  filmes.push(filme)
  res.json(filmes)  
})







const port = 3000
app.listen(port, () => console.log(`Back ok. Porta ${port}.`))
