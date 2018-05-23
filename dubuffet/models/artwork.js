const Sequelize = require('sequelize')
const db = require('./database')

const Artwork = db.define('artwork', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Artwork;
