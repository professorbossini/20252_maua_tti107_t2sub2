const cors = require('cors')
const express = require('express')
const app = express()
//aplicando uma função middleware
app.use(express.json())
app.use(cors())
const filmes = [
  {
    titulo: 'Interestelar',
    sinopse: 'Viagem no espaço com salvamento da humidade.'
  },
  {
    titulo: 'Pecadores',
    sinopse: 'Vampiros.'    
  }
]

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
