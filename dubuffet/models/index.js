console.log('data structures on')
const Sequelize = require('sequelize')

const db = require('./database')

const Artwork = require('./artwork')

const Artist = require('./Artist')

Artwork.belongsTo(Artist)
Artist.hasMany(Artwork)

module.exports = { db, Artwork, Artist }
