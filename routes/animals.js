const express = require('express');
const { query } = require('../lib/db')
const SQL = require('@nearform/sql');
const jwt = require('jsonwebtoken')

const { v4: uuid } = require('uuid');
const router = express.Router()
const { getAnimals, createAnimal, deleteAnimal } = require("../data/animals");
const { auth } = require('../middlewares/auth');

router.get("/", async (req, res, next) => {
    const results = await getAnimals()
    res.send({ animals: results })
});

router.post('/', auth, async (req, res) => {

    const id = uuid();
    const picture = "url"
    //req.body.newAnimal
    const { nameAnimal, type, adoptionStatus, height, weight, color, bio, hypoallergenic, dietaryRestriction, breedOfAnimal } = req.body;
    await createAnimal(id, nameAnimal, type, adoptionStatus, picture, height, weight, color, bio, hypoallergenic, dietaryRestriction, breedOfAnimal, req.user.id)
    res.send({ animal: { id, nameAnimal, type, adoptionStatus, picture, height, weight, color, bio, hypoallergenic, dietaryRestriction, breedOfAnimal } })
})
router.get("/me", auth, async (req, res) => {
    const userId = req.user.id;
    const animals = await getAnimalsByUserId(userId)
    res.send({ animals })
})

router.delete("/animalId",auth,async(req,res)=>{
    const userId = req.user.id;
    const {animalId}= req.params
    const animal = await getAnimalById(animalId)
    const canDeleteAnimal = animal.userId === userId;
    if (!canDeleteAnimal ){
        res.status(403).send({message: 'only animal created can delete'})
        return;
    }
    await deleteAnimal(animalId);
    res.send({message: 'deleted successfully'})
})
module.exports = router


// const { readAnimals, addAnimal } = require('../data/animals');
// const { NewAnimalsValidateSchema } = require('./animalsShemas')
// const getValidationMiddleware = require('../middlewares/validation');

// router.post('/user', async (req, res) => {
//     try {
//         const id = uuid();
//         const { email, password, firstName, secondName, phone } = req.body;
//         const sql = SQL`INSERT INTO users (id, mail, password, first_name, last_name,phone_number) VALUES (${id}, ${email}, ${password},${firstName},${secondName},${phone});`;

//         await query(sql).then(async () => {
//             const userQueryById = SQL `SELECT * FROM users WHERE id = ${id}`
//             const newUser = await query(userQueryById)
//             res.send({ msg: "user added successfully", obg: newUser });
//         })

//     } catch (err) {
//         console.error(err)
//         res.status(400).send(err.message);
//     }
// })

// router.post("/", getValidationMiddleware(NewAnimalsValidateSchema), async (req, res, next) => {
//     try {
//         const { nameAnimal } = req.body;
//         const newAnimal = {
//             id: uuid(),
//             nameAnimal,
//             dateCreated: Date.now(),
//         }
//         await addAnimal(newAnimal);

//         res.status(201).send({ animal: newAnimal });
//     } catch (err) {
//         next(err)
//     }
// })

// router.get("/", async (req, res, next) => {
//     try {
//         const animals = await readAnimals() 
//         res.send({ animals });
//     } catch (err) {
//         next(err)
//     }
// });