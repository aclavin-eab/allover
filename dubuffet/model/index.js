console.log('data structures on')
const Sequelize = require('sequelize')

const db = require('./database')

const Artwork = db.define('artwork', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Artist = db.define('artist', {
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Artwork.belongsTo(Artist)
Artist.hasMany(Artwork)

module.exports = db
