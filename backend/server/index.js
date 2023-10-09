require('dotenv').config()

const cors = require('cors')
const express = require('express')
const { readPosts, createPosts } = require('../utils/pg')
const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', async (_, res) => {
  res.status(200).json(await readPosts())
})

app.post('/posts', async (req, res) => {
  const { titulo, url, descripcion } = req.body
  const posts = await createPosts({ titulo, url, descripcion })
  res.status(201).json(posts)
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Page Not Found' }))

app.listen(PORT, () => console.log(`Server started on: http://localhost:${PORT}`))
