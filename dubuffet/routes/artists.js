const router = require('express').Router()
const { Artist, Artwork } = require('../models')

router.get('/', async (req, res, next) => {
    const artists = await Artist.findAll().catch(next)
    res.json(artists)
})

router.post('/', async (req, res, next) => {
    const artists = await Artists.create(req.body).catch(next)
    res.json(artists)
})

module.exports = router
