const express = require('express')
const router = express.Router()
const Clients = require('./Clients')

router.get('/emails',(req, res) =>{
    res.send('Listagem de emails de clients')
})
