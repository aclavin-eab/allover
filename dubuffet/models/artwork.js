const Sequelize = require('sequelize')
const db = require('./database')

const Artwork = db.define('artwork', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    medium: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contact: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    imageUrl: {
        type: Sequelize.TEXT,
        defaultValue: 'https://www.moma.org/d/assets/W1siZiIsIjIwMTUvMTAvMjEvNWZ6cDZmMzFsNl9qYWNrc29ucG9sbG9jay5qcGciXSxbInAiLCJjb252ZXJ0IiwiLXJlc2l6ZSAyMDAweDIwMDBcdTAwM2UiXV0/jacksonpollock.jpg?sha=802baec91667ec13'
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            min: 0.0,
            max: 5.0
        }
    }

})

module.exports = Artwork;
