console.log('running serving')
const path = require('path')
const express = require('express')
const dex = require('morgan')
const bodyParser = require('body-parser')
const { db } = require('./models')
const PORT = process.env.PORT || 8888
const app = express()
const server = app.listen(PORT, () => console.log(`Buncha Bruts on ${PORT}`))

module.exports = app

db.sync().then(() => console.log('Database is synced'))

app.use(dex('dev'))

app.use(express.static(path.join(__dirname, '..', 'node_modules')))
app.use(express.static(path.join(__dirname, '..', 'stanczak/public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/api', require('./routes'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'stanczak/public/index.html'));
});

app.use((err, req, res, next) =>
    res.status(err.status || 500).send(err.message || 'internal server error')
)
