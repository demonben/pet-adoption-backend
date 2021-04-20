const fs = require('fs');
const { resolve } = require('path');
const path = require('path');


const filePath = path.resolve(__dirname, 'animals.json');

async function readAnimals() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, buffer) => {
            if (err) reject(err);
            else resolve(JSON.parse(buffer.toString()))
        })
    })
}



exports.readAnimals = readAnimals

async function writeAnimals(animals) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(animals), (err) => {
            if (err) reject(err);
            else resolve();
        })
    })
}
exports.writeAnimals = writeAnimals;

async function addAnimal(animal) {
    const animals = await readAnimals();
    animals.push(animal);
    await writeAnimals(animals)
}
exports.addAnimal = addAnimal;
