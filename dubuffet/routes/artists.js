const router = require('express').Router()
const { Artist, Artwork } = require('../models')

router.get('/', async (req, res, next) => {
    const artists = await Artist.findAll()
    res.json(artists)
})

router.post('/', async (req, res, next) => {
    console.log(req.body)
    const artists = await Artist.create(req.body)
    res.json(artists)
})

module.exports = router
