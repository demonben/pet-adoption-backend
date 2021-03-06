const { query } = require('../lib/db')
const SQL = require('@nearform/sql');

function getUsers() {
    return query(SQL`SELECT * FROM users`)
}
exports.getUsers = getUsers


function addUser(id, email, passwordHash, firstName, secondName, phone) {
    return query(SQL`INSERT INTO users (id, mail, passwordHash, first_name, last_name,phone_number) VALUES (${id}, ${email}, ${passwordHash},${firstName},${secondName},${phone});`)
}

exports.addUser = addUser

async function getUserByEmail(email) {
    const row = await query(SQL`SELECT * FROM users WHERE mail =${email} `);
    // console.log("rooow", row.RowDataPacket)
    return row[0];
}
exports.getUserByEmail = getUserByEmail

function updateUserPictureUrl(userId, pictureUrl) {
    const sql = SQL`UPDATE users SET picture = ${pictureUrl} WHERE id = ${userId}`
    return query(sql)
}
exports.updateUserPictureUrl = updateUserPictureUrl

async function getUserById(userId) {
    console.log("userId", userId)

    const sql = SQL`SELECT * FROM users WHERE id=${userId}`
    const rows = await query(sql)
    // console.log("rows", rows)

    return rows[0];
}
exports.getUserById = getUserById;

function deleteUser(id) {
    // console.log("test",id)
    const sql = SQL`DELETE FROM pets_project.users WHERE id =${id}`
    // console.log(query(sql))
    return query(sql)
}
exports.deleteUser = deleteUser

function changeUser(userNewInfo, id) {
    const sql = SQL`UPDATE pets_project.users
SET first_name=${userNewInfo.firstName}, last_name=${userNewInfo.secondName},phone_number=${userNewInfo.phone},mail=${userNewInfo.email}
WHERE id=${id};`
    return query(sql)
}
exports.changeUser = changeUser