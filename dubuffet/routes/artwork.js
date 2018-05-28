const router = require('express').Router()
const { Artist, Artwork } = require('../models')
const fs = require('fs')
const base64Img = require('base64-img')

router.get('/', async (req, res, next) => {
    const art = await Artwork.findAll({include: [{model: Artist, required: false}]}).catch(next)
    res.json(art)
})

router.get('/:id', async (req, res, next) => {
    const art = await Artwork.findById(req.params.id, {include: [{model: Artist, required: false}]}).catch(next)
    res.json(art)
})

router.post('/', async (req, res, next) => {
    const art = await Artwork.create(req.body)
    fs.writeFile('test.jpg', req.body.imageFile, (err) =>{
        if(err) throw err
        console.log('The file is saved!')
    })
    res.json(art)
})

router.put('/:id', async (req, res, next) => {
    if(req.body.imageFile){
        base64Img.img(req.body.imageFile, './images', 'test', async (err) =>{
            if(err) throw err
            console.log('The file is saved!')
            req.body.imageUrl = './images/test.jpg'
            const art = await Artwork.update(req.body, { where: {id: req.body.id} })
            res.json(art)
        })
    } else {
        const art = await Artwork.update(req.body, { where: {id: req.body.id} })
        res.json(art)
    }

})

router.delete('/:id', async (req, res, next) => {
    const art = await Artwork.destroy({where: {id: +req.params.id}}).catch(next)
    console.log(art)
    res.json(req.params.id)
})

module.exports = router
