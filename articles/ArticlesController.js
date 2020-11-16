const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const slugify = require('slugify')

router.get('/admin/articles',(req, res) =>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles =>{
        res.render('admin/articles/index',{
            articles
        })
    })
})

router.get('/admin/articles/new',(req, res) =>{
    Category.findAll().then(categories =>{
        res.render('admin/articles/new',{
            categories
        })
    })
})

router.get('/admin/articles/edit/:id',(req, res) =>{
    let id = req.params.id
    if(!isNaN(id) && id != undefined){
        Article.findByPk(id)
        .then(articles =>{
            res.render('admin/articles/edit',{
                articles
            })
        })
    }else{
        res.redirect('/admin/articles')
    }
})

router.post('/articles/save',(req, res) =>{
    let categoryId = req.body.category
    let articleTitle = req.body.title
    let articleBody = req.body.body
    let sinopse = req.body.sinopse

    if(articleTitle != undefined && articleBody != undefined && sinopse != undefined){
        Article.create({
            title: articleTitle,
            slug: slugify(articleTitle,{
                lower: true
            }),
            body: articleBody,
            sinopse,
            categoryId,
        }).then(() =>{
            res.redirect('/admin/articles')
        })
    }else{
        res.redirect('/admin/articles/new')
    }

})

router.post('/articles/delete',(req, res) =>{
    let id = req.body.id
    
    if(!isNaN(id) && id != undefined){
        Article.destroy({
            where: {
                id
            }
        }).then(_ =>{
            res.redirect('/admin/articles')
        })
    }else{
        res.redirect('/admin/articles')
    }
})

router.post('/articles/edit',(req, res) =>{
    let id = req.body.id
    let title = req.body.title
    let body = req.body.body
    let sinopse = req.body.sinopse
    if(!isNaN(id) && id != undefined){

        Article.update({
            title: title,
            slug: slugify(title,{
                lower: true
            }),
            body: body,
            sinopse: sinopse
        },{
            where: {
                id: id
            }
        }).then(_ =>{
            res.redirect('/admin/articles')
        })
        
    }else{
        res.redirect('/admin/articles')
    }
})



module.exports = router