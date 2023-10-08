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
/*
const readPosts = async () => {
  const query = `${process.env.PG_QUERY_GET} ${process.env.PG_TABLE};`
  // console.log(`query--> ${query}`)
  const dbRowsPosts = await executeQuery(query)
  // console.log(`dbRowsPosts--> ${dbRowsPosts}`)
  if (dbRowsPosts?.code) return console.error(`Error: ${dbRowsPosts}`)
  return dbRowsPosts.rows
}
*/
const readPosts = async () => await executeQuery('select * from posts;')

const createPosts = async ({ titulo, url: img, descripcion }) => {
  const query = 'insert into posts(id, titulo, img, descripcion) values($1, $2, $3, $4) RETURNING *;'
  const postValues = [uuidv4(), titulo, img, descripcion]
  return await executeQuery(query, postValues)
}

module.exports = {
  readPosts,
  createPosts
}
