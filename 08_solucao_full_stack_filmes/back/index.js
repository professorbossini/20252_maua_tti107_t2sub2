const express = require('express')
const app = express()
//aplicando uma função middleware
app.use(express.json())

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




const port = 3000
app.listen(port, () => console.log(`Back ok. Porta ${port}.`))
