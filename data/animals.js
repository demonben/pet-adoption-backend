const { query } = require('../lib/db')
const SQL = require('@nearform/sql');

function getAnimals() {
    return query(SQL`SELECT * FROM animals`)
}

exports.getAnimals = getAnimals

function createAnimal(id, nameAnimal, type, adoptionStatus, picture, height, weight, color, bio, hypoallergenic, dietaryRestriction, breedOfAnimal, userId) {
    // console.log(id)
    // console.log(nameAnimal)
    // console.log(type)
    // console.log(adoptionStatus)
    // console.log(picture)
    // console.log(height)
    // console.log(weight)
    // console.log(color)
    // console.log(bio)
    // console.log(hypoallergenic)
    // console.log(dietaryRestriction)
    // console.log(breedOfAnimal)
    // console.log(userId)
    const sql = SQL`INSERT INTO animals (id, name_animal, type, adoption_status,picture,height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal,userId) VALUES (${id},${nameAnimal}, ${type},${adoptionStatus},${picture},${height},${weight},${color},${bio},${hypoallergenic},${dietaryRestriction},${breedOfAnimal},${userId});`
    console.log('added new animal')
    return query(sql)
}

exports.createAnimal = createAnimal

async function getAnimalById(id) {
    // console.log("id", id.id)
    // console.log("id", id)
    const sql = SQL`SELECT * FROM animals WHERE id=${id}`;
    const rows = await query(sql)
    // console.log("data",rows)
    return rows[0]
}
exports.getAnimalById = getAnimalById

function getAnimalsByUserId(userId) {
    const sql = SQL`SELECT * FROM animals WHERE userId=${userId}`;
    return query(sql)
}
exports.getAnimalsByUserId = getAnimalsByUserId;

function getAnimalByType(type){
    console.log(type)
    const sql = SQL`SELECT * FROM animals WHERE type=${type}`;
    return query(type)
}
exports.getAnimalByType = getAnimalByType

function deleteAnimal(id) {
    const sql = SQL`DELETE FROM pets_project.animals WHERE id =${id}`
    return query(sql)
}
exports.deleteAnimal = deleteAnimal

async function updateAnimalPictureUrl(animalId, animalUrl){
    const sql = SQL`UPDATE animals SET picture = ${animalUrl} WHERE id=${animalId}`;
    return query(sql)
}
exports.updateAnimalPictureUrl = updateAnimalPictureUrl; 

function changeAnimal(nameAnimal, type, id) {
    const sql = SQL`UPDATE pets_project.animals
SET name_animal=${nameAnimal}, type=${type}
WHERE id=${id.id};`
    return query(sql)
}
exports.changeAnimal = changeAnimal





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
