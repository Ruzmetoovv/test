const mysql = require('mysql2')
const env = require('./env.config')

const db = mysql.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME
}).promise()

module.exports = db