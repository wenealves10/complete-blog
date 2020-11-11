require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('../database/database')

// objeto de configuração da aplicação
const configs = {
    port: process.env.PORT || 8080,
}

// configurando o express
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// conexão com o banco de dados
connection
  .authenticate()
     .then((result) => {
         console.log('connection success!')
     }).catch((err) => {
         console.log('connection erro: '+err)
     });

// rotas gets da aplicação 
app.get('/',(req, res) =>{
    res.render('index')
})

// porta da aplicação
app.listen(configs.port, () => {
    console.log(`Server port ${configs.port}`)
})

