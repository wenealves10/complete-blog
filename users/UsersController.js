const express = require('express')
const router = express.Router()
const Users = require('./Users')
const bcrypt = require('bcryptjs')
const adminAuth = require('../middlewares/AdminAuth')

router.get('/admin/users',adminAuth, (req, res) => {
    Users.findAll()
        .then(users => {
            res.render('users/users', {
                users
            })
        }).catch(err => {
            res.redirect('/')
        })
})

router.get('/admin/users/create',adminAuth, (req, res) => {
    res.render('users/create')
})

router.get('/users/login',(req, res) =>{
    if(req.session.user != undefined){
        res.redirect('/admin/users')
    }else{
        res.render('users/login')
    }
})

router.get('/users/logout', (req, res) => {
    req.session.user = undefined
    res.redirect('/')
})

router.post('/authenticate',(req, res) =>{
    let email = req.body.email
    let password = req.body.password
   
    Users.findOne({
        where: {
            email: email
        }
    }).then(user =>{
        if(user != undefined){
            let compare = bcrypt.compareSync(password, user.password)
            if(compare){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/users')
            }else{
                res.redirect('/users/login')
            }
        }else{
            res.redirect('/users/login')
        }
    }).catch( err =>{
        res.redirect('/users/login')
    })
})


router.post('/users/save', adminAuth , (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (email != '' && password != '') {

        Users.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user == undefined) {
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(password, salt)
                Users.create({
                    email,
                    password: hash
                }).then(_ => {
                    res.redirect('/admin/users')
                }).catch(err => {
                    res.redirect('/admin/users')
                })
            } else {
                res.redirect('/admin/users/create')
            }
        })

    } else {
        res.redirect('/admin/users')
    }
})

module.exports = router