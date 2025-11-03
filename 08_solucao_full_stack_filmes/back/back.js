require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD



const Filme = mongoose.model("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

async function conectarAoMongoDB(){
  await mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.hdsyng3.mongodb.net/?appName=Cluster0`)
}

//aplicando uma função middleware
app.use(express.json())
app.use(cors())
// const filmes = [
//   {
//     titulo: 'Interestelar',
//     sinopse: 'Viagem no espaço com salvamento da humidade.'
//   },
//   {
//     titulo: 'Pecadores',
//     sinopse: 'Vampiros.'    
//   }
// ]

app.get('/filmes', async (req, res) => {
  const filmes = await Filme.find()
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
app.post('/filmes', async (req, res) => {
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse
  // const filme = new Filme({titulo: titulo, sinopse: sinopse})
  const filme = new Filme({titulo, sinopse})
  await filme.save()
  //como fazer uma busca no mongodb para encontrar a coleção inteira
  const filmes = await Filme.find()
  res.json(filmes)  
})

const port = 3000
app.listen(port, () => {
  try{
    console.log(`Back ok. Porta ${port}.`)
    conectarAoMongoDB()
    console.log("Conexão com o MongoDB OK!")
  }
  catch(e){
    console.log('Conexão com o MongoDB falhou: ' + e)
  }
})
