const Sequelize = require('sequelize')
const Artwork = require('./artwork')
const db = require('./database')

const Artist = db.define('location', {
    latitude: {
        type: Sequelize.DECIMAL(7, 3),
        allowNull: false
    },
    longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    title: {
        type: Sequelize.STRING
    }
})

module.exports = Artist
