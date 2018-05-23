const router = require('express').Router()
const { Artist, Artwork } = require('../models')

router.get('/', async (req, res, next) => {
    const art = await Artwork.findAll().catch(next)
    res.json(art)
})

router.post('/', async (req, res, next) => {
    const art = await Artwork.create(req.body).catch(next)
    res.json(art)
})

module.exports = router
