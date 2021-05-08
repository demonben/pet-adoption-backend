const { query } = require('../lib/db')
const SQL = require('@nearform/sql');

function getAnimals() {
    return query(SQL`SELECT * FROM animals`)
}

exports.getAnimals = getAnimals

function createAnimal(id, nameAnimal, type, adoptionStatus, urlAnimal, height, weight, color, bio, hypoallergenic, dietaryRestriction, breedOfAnimal, userId) {
    const sql = SQL`INSERT INTO animals (id, name_animal, type, adoption_status,picture,height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal,userId) VALUES (${id},${nameAnimal}, ${type},${adoptionStatus},${urlAnimal},${height},${weight},${color},${bio},${hypoallergenic},${dietaryRestriction},${breedOfAnimal},${userId});`
    return query(sql)
}

exports.createAnimal = createAnimal

async function getAnimalById(id) {
    const sql = SQL`SELECT * FROM animals WHERE id=${id}`;
    const rows = await query(sql)
    return rows[0]
}
exports.getAnimalById = getAnimalById

function getAnimalsByUserId(userId) {
    const sql = SQL`SELECT * FROM animals WHERE userId=${userId}`;
    return query(sql)
}
exports.getAnimalsByUserId = getAnimalsByUserId;

async function getAnimalByType(type) {
    const sql = SQL`SELECT * FROM pets_project.animals WHERE type=${type}`;
    const searchResult = await query(sql)
    return searchResult
}
exports.getAnimalByType = getAnimalByType

function deleteAnimal(id) {
    const sql = SQL`DELETE FROM pets_project.animals WHERE id=${id}`

    return query(sql)
}
exports.deleteAnimal = deleteAnimal

async function updateAnimalPictureUrl(animalId, animalUrl) {
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

function addOwner(pet_id, userId) {
    const sql = SQL`UPDATE animals SET owner_id=${userId} WHERE id=${pet_id}`
    return query(sql)
}
exports.addOwner = addOwner

function changeStatus(pet_id, status, idOwner) {
    const sql = SQL`UPDATE animals SET adoption_status=${status},owner_id=${idOwner} WHERE id=${pet_id}`
    return query(sql)
}
exports.changeStatus = changeStatus

function getOwnPets(ownerId) {
    const sql = SQL`SELECT * FROM pets_project.animals WHERE owner_id=${ownerId}`
    return query(sql)
}
exports.getOwnPets = getOwnPets


