const Sequelize = require('sequelize')

const db = require('./database')

const Artwork = require('./artwork')

const Artist = require('./artist')

const Location = require('./location')

const User = require('./user')

Artwork.belongsTo(Artist)
Artist.hasMany(Artwork)

Artwork.belongsTo(Location)
Location.hasMany(Artwork)

Artwork.belongsTo(User)
User.hasMany(Artwork)

module.exports = { db, Artwork, Artist, Location, User }
