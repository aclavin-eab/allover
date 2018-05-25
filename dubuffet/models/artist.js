const Sequelize = require('sequelize')
const db = require('./database')

const Artist = db.define('artist', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    origin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://www.artline.com/php/images/julian-stanczak-self-portrait-artline.jpg'
    },
    bio: {
        type: Sequelize.TEXT
    }
})

module.exports = Artist
