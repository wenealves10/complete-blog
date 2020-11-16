const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')
const Article = connection.define('articles',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    sinopse: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// relacionamentos entre tables
Category.hasMany(Article) // 1 para Muitos
Article.belongsTo(Category) // 1 para 1

// Sincronizar e Recriar Tables
// Article.sync({ force: true }).then(() => {
//     console.log('sincronizado')
// })

module.exports = Article