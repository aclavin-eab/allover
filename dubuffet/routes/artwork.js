const router = require('express').Router()
const { Artist, Artwork } = require('../models')

router.get('/', async (req, res, next) => {
    const art = await Artwork.findAll().catch(next)
    res.json(art)
})

router.get('/:id', async (req, res, next) => {
    const art = await Artwork.findById(req.params.id).catch(next)
    res.json(art)
})

router.post('/', async (req, res, next) => {
    const art = await Artwork.create(req.body).catch(next)
    res.json(art)
})

router.put('/:id', async (req, res, next) => {
    const art = await Artwork.update(req.body, { where: {id: req.body.id} }).catch(next)
    res.json(art)
})

router.delete('/:id', async (req, res, next) => {
    const art = await Artwork.destroy({where: {id: +req.params.id}}).catch(next)
    console.log(art)
    res.json(req.params.id)
})

module.exports = router
