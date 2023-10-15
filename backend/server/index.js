require('dotenv').config()

const cors = require('cors')
const express = require('express')
const { readPosts, createPosts, updateLikes, deletePost } = require('../utils/pg')
const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', async (_, res) => {
  readPosts()
    .then((dbResponse) => res.status(dbResponse?.code ? 500 : 200).json(dbResponse))
    .catch((error) => res.status(500).json(error))
})

app.post('/posts', async (req, res) => {
  const { titulo, url, descripcion } = req.body
  createPosts({ titulo, url, descripcion })
    .then((dbResponse) => res.status(dbResponse?.code ? 500 : 201).json(dbResponse))
    .catch((error) => res.status(500).json(error))
})

app.put('/posts/like/:id', async (req, res) => {
  updateLikes(req.params.id)
    .then((dbResponse) => res.status(dbResponse?.code ? 500 : 200).json(dbResponse))
    .catch((error) => res.status(500).json(error))
})

app.delete('/posts/:id', async (req, res) => {
  deletePost(req.params.id)
    .then((dbResponse) => res.status(dbResponse?.code ? 500 : 200).json(dbResponse))
    .catch((error) => res.status(500).json(error))
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Page Not Found' }))

app.listen(PORT, () => console.log(`Server started at: http://localhost:${PORT}`))
