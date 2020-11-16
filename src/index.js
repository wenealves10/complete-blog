require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('../database/database')

// Models da Aplicação
const Article = require('../articles/Article')
const Category = require('../categories/Category')

// Routers da Aplicação
const categoriesController = require('../categories/CategoriesController')
const articlesController = require('../articles/ArticlesController')

// objeto de configuração da aplicação
const configs = {
    port: process.env.PORT || 8080,
}

// configurando o express
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// conexão com o banco de dados
connection
    .authenticate()
    .then((result) => {
        console.log('connection success!')
    }).catch((err) => {
        console.log('connection erro: ' + err)
    });

// rotas principal da aplicação 
app.get('/', (req, res) => {
    Article.findAll({
            order: [
                ['id', 'DESC']
            ],
            include: [{model: Category}]
        })
        .then(articles => {
            Category.findAll()
                .then(categories => {
                    res.render('index', {
                        articles,
                        categories
                    })
                })
        })
})

// rota de ler artigo
app.get('/:slug', (req, res) => {
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug
        }

    }).then(article => {
        if (article != undefined) {
            Category.findAll()
                .then(categories => {
                    res.render('article', {
                        article,
                        categories
                    })
                })
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

app.get('/categories/:slug',(req, res) =>{
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category =>{
        if(category != undefined){
            Category.findAll()
                .then(categories =>{
                    res.render('filtro',{
                        articles: category.articles,
                        categories,
                        category
                    })
                })
        }else{
            res.redirect('/')
        }
    }).catch(err =>{
        res.redirect('/')
    })
})

// rotas categorias
app.use('/', categoriesController)

// rotas artigos
app.use('/', articlesController)

// porta da aplicação
app.listen(configs.port, () => {
    console.log(`Server port ${configs.port}`)
})
