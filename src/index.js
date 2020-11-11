require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const configs = {
    port: process.env.PORT || 8080,
}

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req, res) =>{
    res.render('index')
})

app.listen(configs.port, () => {
    console.log(`Server port ${configs.port}`)
})

