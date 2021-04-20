const mysql = require('mysql')
const Postgrator = require('postgrator')
const path = require('path')

const postgrator = new Postgrator({
    migrationDirectory: path.resolve(__dirname, '../migrations'),
    driver: 'mysql',
    host: '0.0.0.0',
    port: 3306,
    database: 'pets_project',
    username: 'root',
    password: 'olya1110',
    schemaTable: 'migrations',
})
exports.postgrator = postgrator;

const pool = mysql.createPool({
    host: '0.0.0.0',
    user: 'root',
    password: 'olya1110',
    database: 'pets_project'
})
exports.pool = pool

// utility function query data base with promise(promisify) 
function query (sql){
    return new Promise((resolve, reject)=>{
        pool.query(sql,(err, result)=>{
            if(err)reject(err);
            
            else resolve(result);
        });
    })
}
exports.query = query