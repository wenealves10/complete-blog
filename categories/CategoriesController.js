const express = require('express')
const router = express.Router()
const Category = require('./Category')
const Article = require('../articles/Article')
const slugify = require('slugify')
const adminAuth = require('../middlewares/AdminAuth')


router.get('/admin/categories/new', adminAuth, (req, res) => {
    res.render('admin/categories/new')
})

router.get('/admin/categories', adminAuth, (req, res) => {
    Category.findAll()
        .then(categories => {
            res.render('admin/categories/index', {
                categories
            })
        })
})

router.post('/categories/save', adminAuth, (req, res) => {
    let title = req.body.title
    if (title != undefined && title != '' && title != ' ') {
        Category.create({
            title,
            slug: slugify(title, {
                lower: true
            })
        }).then(() => {
            res.redirect('/admin/categories')
        })
    } else {
        res.redirect('/admin/categories/new')
    }
})

router.post('/categories/delete', adminAuth, (req, res) => {
    let id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {

            Article.destroy({
                where: {
                    categoryId: id
                }
            }).then(_ => {
                Category.destroy({
                    where: {
                        id
                    }
                }).then(_ => {
                    res.redirect('/admin/categories')
                })
            })

        } else {
            res.redirect('/admin/categories')
        }
    } else {
        res.redirect('/admin/categories')
    }
})


router.post('/categories/edit', adminAuth, (req, res) => {
    let title = req.body.categoryEdit
    let editID = req.body.editID

    Category.update({
        title: title,
        slug: slugify(title, {
            lower: true
        })
    }, {
        where: {
            id: editID
        }
    }).then(_ => {
        res.redirect('/admin/categories')
    })

})


module.exports = router