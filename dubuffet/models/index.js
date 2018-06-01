console.log('data structures on')
const Sequelize = require('sequelize')

const db = require('./database')

const Artwork = require('./artwork')

const Artist = require('./artist')

const Location = require('./location')

Artwork.belongsTo(Artist)
Artist.hasMany(Artwork)

Artwork.belongsTo(Location)
Location.hasMany(Artwork)

module.exports = { db, Artwork, Artist, Location }
