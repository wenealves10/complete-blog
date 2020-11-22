const express = require('express')
const router = express.Router()
const Users = require('./Users')
const bcrypt = require('bcryptjs')


router.get('/admin/users', (req, res) => {
    Users.findAll({
        order: [
            ['id','DESC']
        ]
    }).then(users =>{
        res.render('users/users',{
            users
        })
    }).catch(err =>{
        res.redirect('/')
    })
})

router.get('/admin/users/create', (req, res) => {
    res.render('users/create')
})

router.post('/users/save', (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (email != '' && password != '') {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        Users.create({
            email,
            password: hash
        }).then(_ =>{
            res.redirect('/admin/users')
        }).catch(err =>{
            res.redirect('/admin/users')
        })
    }else{
        res.redirect('/admin/users')
    }
})

module.exports = router