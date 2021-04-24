const { query } = require('../lib/db')
const SQL = require('@nearform/sql');


function addUser(id, email, passwordHash, firstName, secondName, phone) {
    return query(SQL`INSERT INTO users (id, mail, passwordHash, first_name, last_name,phone_number) VALUES (${id}, ${email}, ${passwordHash},${firstName},${secondName},${phone});`)
}

exports.addUser = addUser

async function getUserByEmail(email) {
    const row = await query(SQL`SELECT * FROM users WHERE mail =${email} `);
    return row[0];
}
exports.getUserByEmail = getUserByEmail

function updateUserPictureUrl(userId, pictureUrl){
    const sql = SQL`UPDATE users SET picture = ${pictureUrl} WHERE id = ${userId}`
    return query(sql)
}
exports.updateUserPictureUrl = updateUserPictureUrl