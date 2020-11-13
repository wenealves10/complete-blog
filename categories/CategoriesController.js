const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')


router.get('/admin/categories/new',(req, res) =>{
    res.render('admin/categories/new')
})

router.get('/admin/categories', (req, res) =>{
    Category.findAll()
      .then(categories => {
        res.render('admin/categories/index',{ categories })
      })
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
            res.redirect('/admin/categories')
        })        
    }else{
        res.redirect('/admin/categories/new')
    }
})

router.post('/categories/delete', (req, res) =>{
    let id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
            
            Category.destroy({
                where:{
                    id
                }
            }).then(_ =>{
                res.redirect('/admin/categories')
            })

        }else{
            res.redirect('/admin/categories')
        }
    }else{
        res.redirect('/admin/categories')
    }
})


router.post('/categories/edit',(req, res) =>{
    let title = req.body.categoryEdit
    let editID = req.body.editID

    res.send(title+' '+editID)
})


module.exports = router