const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')


router.get('/admin/categories/new',(req, res) =>{
    res.render('admin/categories/new')
})

router.post('/categories/save', (req, res) =>{
    let title = req.body.title
    if(title != undefined && title != '' && title != ' '){
        Category.create({
            title,
            slug: slugify(title,{
                lower: true
            })
        }).then(() =>{
            res.redirect('/')
        })        
    }else{
        res.redirect('/admin/categories/new')
    }
})

module.exports = router