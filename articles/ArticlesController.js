const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const slugify = require('slugify')


router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{
            model: Category
        }]
    }).then(articles => {
        res.render('admin/articles/index', {
            articles
        })
    })
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {
            categories
        })
    })
})

router.get('/admin/articles/edit/:id', (req, res) => {
    let id = req.params.id
    if (!isNaN(id) && id != undefined) {
        Article.findByPk(id)
            .then(articles => {
                Category.findAll()
                    .then(categories => {
                        res.render('admin/articles/edit', {
                            articles,
                            categories
                        })
                    })
            })
    } else {
        res.redirect('/admin/articles')
    }
})

router.get('/articles/page/:number', (req, res) => {
    let page = req.params.number
    let offset = 0

    if (isNaN(page) || page == 1) {
        offset = 0
    } else {
        offset = (parseInt(page) - 1) * 4
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        include: [{
            model: Category
        }],
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        let next = false

        if (offset + 4 >= articles.count) {
            next = false
        } else {
            next = true
        }

        let result = {
            page: parseInt(page),
            articles,
            next
        }

        Category.findAll()
            .then(categories => {
                res.render('admin/articles/pages', {
                    result,
                    categories
                })
            })

    })

})


router.post('/articles/save', (req, res) => {
    let categoryId = req.body.category
    let articleTitle = req.body.title
    let articleBody = req.body.body
    let sinopse = req.body.sinopse
    let thumbnail = 'images.jpg'

    if (articleTitle != undefined && articleBody != undefined && sinopse != undefined) {
        Article.create({
            title: articleTitle,
            slug: slugify(articleTitle, {
                lower: true
            }),
            body: articleBody,
            sinopse,
            thumbnail,
            categoryId,
        }).then(() => {
            res.redirect('/admin/articles')
        })
    } else {
        res.redirect('/admin/articles/new')
    }

})

router.post('/articles/delete', (req, res) => {
    let id = req.body.id

    if (!isNaN(id) && id != undefined) {
        Article.destroy({
            where: {
                id
            }
        }).then(_ => {
            res.redirect('/admin/articles')
        })
    } else {
        res.redirect('/admin/articles')
    }
})

router.post('/articles/edit', (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let body = req.body.body
    let sinopse = req.body.sinopse
    let categoryId = req.body.category
    if (!isNaN(id) && id != undefined) {

        Article.update({
            title: title,
            slug: slugify(title, {
                lower: true
            }),
            body: body,
            sinopse: sinopse,
            categoryId: categoryId
        }, {
            where: {
                id: id
            }
        }).then(_ => {
            res.redirect('/admin/articles')
        })

    } else {
        res.redirect('/admin/articles')
    }
})



module.exports = router