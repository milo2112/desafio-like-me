const { v4: uuidv4 } = require('uuid')
const { executeQuery } = require('./pg')

const createPosts = async ({ titulo, url: img, descripcion }) => {
  const query = 'INSERT INTO posts(id, titulo, img, descripcion) VALUES($1, $2, $3, $4) RETURNING *;'
  const postValues = [uuidv4(), titulo, img, descripcion]
  return await executeQuery(query, postValues)
}

const readPosts = async () => {
  return await executeQuery('SELECT * FROM posts;')
}

const readPost = async (id) => {
  const query = 'SELECT * FROM posts WHERE id = $1;'
  return await executeQuery(query, [id])
}

const updateLikes = async (id) => {
  const postRecordToUpdate = await readPost(id)
  const likes = Number(postRecordToUpdate[0].likes) + 1
  const query = 'UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *;'
  return await executeQuery(query, [likes, id])
}

const deletePost = async (id) => {
  const query = 'DELETE FROM posts WHERE id = $1 RETURNING *;'
  return await executeQuery(query, [id])
}

module.exports = {
  createPosts,
  readPosts,
  updateLikes,
  deletePost
}
