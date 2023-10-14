require('dotenv').config()
const { Pool } = require('pg')
const { v4: uuidv4 } = require('uuid')

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  allowExitOnIdle: true
}

const pool = new Pool(config)

const executeQuery = async (query, values) => pool
  .query(query, values)
  .then(({ rows }) => rows)
  .catch(({ code, message }) => ({ code, message }))

const readPosts = async () => {
  return await executeQuery('SELECT * FROM posts;')
}

const readPost = async (id) => {
  const query = 'SELECT * FROM posts WHERE id = $1;'
  return await executeQuery(query, [id])
}

const createPosts = async ({ titulo, url: img, descripcion }) => {
  const query = 'insert into posts(id, titulo, img, descripcion) values($1, $2, $3, $4) RETURNING *;'
  const postValues = [uuidv4(), titulo, img, descripcion]
  return await executeQuery(query, postValues)
}

const updateLikes = async (id) => {
  const postRecordToUpdate = await readPost(id)
  const likes = Number(postRecordToUpdate[0].likes) + 1
  const query = 'UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *;'
  const postValues = [likes, id]
  return await executeQuery(query, postValues)
}

const deletePost = async (id) => {
  const query = 'DELETE FROM posts WHERE id = $1 RETURNING *;'
  return await executeQuery(query, [id])
}

module.exports = {
  readPosts,
  createPosts,
  updateLikes,
  deletePost
}
