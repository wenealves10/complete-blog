const Sequelize = require('sequelize')
const connection = require('../database/database')

const Clients = connection.define('clients',{
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Clients.sync({force: true})

module.exports = Clients