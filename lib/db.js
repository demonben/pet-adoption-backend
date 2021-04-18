const mysql = require('mysql')

const pool = mysql.createPool({
    host: '0.0.0.0',
    user: 'root',
    password: 'olya1110',
    database: 'pets_project'
})

exports.pool = pool