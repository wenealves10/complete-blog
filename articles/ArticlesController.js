const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const slugify = require('slugify')

router.get('/admin/articles',(req, res) =>{
    res.send('Rota de Artigos')
})

router.get('/admin/articles/new',(req, res) =>{
    Category.findAll().then(categories =>{
        res.render('admin/articles/new',{
            categories
        })
    })
})

router.post('/articles/save',(req, res) =>{
    let categoryId = req.body.category
    let articleTitle = req.body.title
    let articleBody = req.body.body

    if(articleTitle != undefined && articleBody != undefined){
        Article.create({
            title: articleTitle,
            slug: slugify(articleTitle,{
                lower: true
            }),
            body: articleBody,
            categoryId,
        }).then(() =>{
            res.redirect('/')
        })
    }else{
        res.redirect('/admin/articles/new')
    }

})



module.exports = router