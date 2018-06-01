const router = require('express').Router()
const { Location } = require('../models')

router.get('/', async (req, res, next) => {
    const locations = await Location.findAll()
    res.json(locations)
})

router.post('/', async (req, res, next) => {
    const location = await Location.create(req.body)
    res.json(location)
})

router.get('/:id', async (req, res, next) => {
    const location = await Location.findById(req.params.id).catch(next)
    res.json(location)
})

router.put('/:id', async (req, res, next) => {
    const location = await Location.update(req.body, { where: {id: req.body.id} }).catch(next)
    res.json(location)
})

router.delete('/:id', async (req, res, next) => {
    Artwork.update({locationId: null}, {where: {locationId: +req.params.id}})
    const artist = await Location.destroy({where: {id: +req.params.id}}).catch(next)
    res.json(req.params.id)
})

module.exports = router
