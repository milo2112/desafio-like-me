const { Pool } = require('pg')
const { config } = require('./dbConfig')

const pool = new Pool(config)

const executeQuery = async (query, values) => pool
  .query(query, values)
  .then(({ rows }) => rows)
  .catch(({ code, message }) => ({ code, message }))

module.exports = {
  executeQuery
}
