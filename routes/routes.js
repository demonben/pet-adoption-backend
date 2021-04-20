const express = require('express');
const { readAnimals, addAnimal } = require('../data/animals');
const { query } = require('../lib/db')
const SQL = require('@nearform/sql');

const { NewAnimalsValidateSchema } = require('./animalsShemas')
const getValidationMiddleware = require('../middlewares/validation');
const { v4: uuid } = require('uuid');
const router = express.Router()

// animals
router.get("/product", async (req, res, next) => {
    const results = await query(SQL`SELECT * FROM animals`)
    console.log(results)
    res.send({ animals: results })
});

router.post('/product', async (req, res) => {
    const { nameAnimal, type } = req.body;
    console.log(req.body.nameAnimal)
    const sql = SQL`INSERT INTO animals (nameAnimal, type) VALUES (${nameAnimal.nameAnimal}, ${nameAnimal.type});`
    const result = await query(sql)
    res.send("animal added successfully")
})

// profile signup
router.post('/user', async(req,res)=>{
    const { userSignup } = req.body
    console.log(userSignup)
    const sql = SQL`INSERT INTO users (mail, password, first_name, last_name,phone_number) VALUES (${userSignup.email}, ${userSignup.password},${userSignup.firstName},${userSignup.secondName},${userSignup.phone});`
    const result = await query(sql)
    res.send("user added successfully")
})

module.exports = router






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