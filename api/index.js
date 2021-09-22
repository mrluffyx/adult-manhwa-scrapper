const scapper = require('./scrapper')
const express = require('express')
const { env } = require('process')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/api/', (req, res) => {
    res.send(`
        Latest Chapters at: /api/latest/:page (example: /api/latest/1) <br>
        All Manhwa List at: /api/all <br>
        Manhwa Info + Chapters at: /api/info/:slug (example: /api/chapter/manga-secret-class [without .html]) <br>
        Manhwa Images List at: /api/chapter/:slug (example: /api/chapter/read-secret-class-chapter-1 [without .html])
        `)
})

app.get('/api/latest/:page', async (req, res) => {

    const result = await scapper.latest(req.params.page)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/api/all', async (req, res) => {

    const result = await scapper.all()

    res.setHeader('Cache-Control', 's-maxage=43200');
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/api/info/:slug', async (req, res) => {

    const result = await scapper.info(req.params.slug)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/api/chapter/:slug', async (req, res) => {

    const result = await scapper.chapter(req.params.slug)

    res.setHeader('Cache-Control', 's-maxage=43200');
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

port = env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
