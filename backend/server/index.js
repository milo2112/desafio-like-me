require('dotenv').config()
const cors = require('cors')
// const fs = require('fs')
const express = require('express')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', (_, res) => {
  res.json([])
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Page Not Found' }))

app.listen(PORT, () => console.log(`Server started on: http://localhost:${PORT}`))
