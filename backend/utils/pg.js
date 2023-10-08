require('dotenv').config()
const { Pool } = require('pg')

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  allowExitOnIdle: true
}

const pool = new Pool(config)
console.log(`${process.env.PG_GET} ${process.env.PG_TABLE};`)
console.log(process.env.PG_TABLE)

/* const getPosts = async () => {
  try {
    const dbRowsPosts = await pool.query(`select * friom ${process.env.PG_TABLE};`)
    return dbRowsPosts.rows
  } catch ({ code, message }) {
    console.log({ code, message })
  }
} */

const executeQuery = async (query, values) => pool
  .query(query, values)
  .then(({ rows }) => rows)
  .catch(({ code, message }) => ({ code, message }))

const readPosts = async () => {
  const dbRowsPosts = await executeQuery(`${process.env.PG_GET} ${process.env.PG_TABLE};`)
  if (dbRowsPosts?.code) return console.error(`Error: ${dbRowsPosts}`)
  return dbRowsPosts.rows
}

module.exports = {
  readPosts
}
