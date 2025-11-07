require('dotenv').config()
const bcrypt = require('bcrypt')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const app = express()

const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD

const Filme = mongoose.model("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema({
  login: {type: String, require: true, unique: true},
  password: {type: String, require: true}
})

usuarioSchema.plugin(uniqueValidator)

const Usuario = mongoose.model("Usuario", usuarioSchema)

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

app.post('/signup', async(req, res) => {
  try{
    const login  = req.body.login
    const password = req.body.password
    const senhaCriptografada = await bcrypt.hash(password, 10)
    const usuario = new Usuario({
      login: login,
      password: senhaCriptografada
    })  
    const respMongo = await usuario.save()
    console.log(respMongo)
    res.status(201).end()
  }
  catch(e){
    console.log(e)
    res.status(409).end()
  }
})

app.post('/login', async (req, res) => {
  const login = req.body.login
  const password = req.body.password
  const u = await Usuario.findOne({login: login})
  if(!u)
    return res.status(401).json({mensagem: "Usuario inválido"})
  const senhaValida = await bcrypt.compare(password, u.password)
  if(!senhaValida)
    return res.status(401).json({mensagem: "Senha inválida"})
  res.status(200).end()
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
