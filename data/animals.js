const { query } = require('../lib/db')
const SQL = require('@nearform/sql');


function getAnimals() {
    return query(SQL`SELECT * FROM animals`)
}

exports.getAnimals = getAnimals

function createAnimal(id, nameAnimal, type, adoptionStatus, picture, height, weight, color, bio, hypoallergenic, dietaryRestriction, breedOfAnimal, userId) {
    const sql = SQL`INSERT INTO animals (id, name_animal, type, adoption_status,picture,height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal,userId) VALUES (${id},${nameAnimal}, ${type},${adoptionStatus},${picture},${height},${weight},${color},${bio},${hypoallergenic},${dietaryRestriction},${breedOfAnimal},${userId});`
    return query(sql)
}

exports.createAnimal = createAnimal

function getAnimalById(id){
    const sql = SQL`SELECT * FROM animals WHERE id=${id}`;
    return query(sql)
}
exports.getAnimalById = getAnimalById

function getAnimalsByUserId(userId){
    const sql = SQL`SELECT * FROM animals WHERE userId=${userId}`;
    return query(sql)
}
exports.getAnimalsByUserId = getAnimalsByUserId;

function deleteAnimal(id){
const sql = SQL `DELETE FROM animals WHERE id =${id}`
return query(sql)
}
exports.deleteAnimal = deleteAnimal





// const fs = require('fs');
// const { resolve } = require('path');
// const path = require('path');


// const filePath = path.resolve(__dirname, 'animals.json');

// async function readAnimals() {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, (err, buffer) => {
//             if (err) reject(err);
//             else resolve(JSON.parse(buffer.toString()))
//         })
//     })
// }

// exports.readAnimals = readAnimals

// async function writeAnimals(animals) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(filePath, JSON.stringify(animals), (err) => {
//             if (err) reject(err);
//             else resolve();
//         })
//     })
// }
// exports.writeAnimals = writeAnimals;

// async function addAnimal(animal) {
//     const animals = await readAnimals();
//     animals.push(animal);
//     await writeAnimals(animals)
// }
// exports.addAnimal = addAnimal;
