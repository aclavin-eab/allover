const Sequelize = require('sequelize')
const db = require('./database')

const Artist = db.define('artist', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Artist
