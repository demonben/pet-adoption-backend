const express = require('express');
const { readAnimals, addAnimal } = require('../data/animals');
const { pool } = require('../lib/db')

const { NewAnimalsValidateSchema } = require('./animalsShemas')
const getValidationMiddleware = require('../middlewares/validation');
const { v4: uuid } = require('uuid');
const router = express.Router()

pool.query(`CREATE TABLE IF NOT EXISTS products(
    id            VARCHAR(36) DEFAULT(UUID()),
    name          VARCHAR(200) NOT NULL,
    price         INT NOT NULL,
    created_date  DATE DEFAULT(CURRENT_DATE),
    PRIMARY KEY(id)
);`,(err)=>{
    if(err){
        console.error(err);
    }else{
        console.log("product table created successfully")
    }
}
)

router.get("/", async (req, res, next) => {
    try {
        const animals = await readAnimals()
        // console.log(animals)
        res.send({ animals });
    } catch (err) {
        next(err)
    }
});
router.post("/", getValidationMiddleware(NewAnimalsValidateSchema), async (req, res, next) => {
    try {
        const { nameAnimal } = req.body;
        const newAnimal = {
            id: uuid(),
            nameAnimal,
            dateCreated: Date.now(),
        }
        await addAnimal(newAnimal);

        res.status(201).send({ animal: newAnimal });
    } catch (err) {
        next(err)
    }
})
module.exports = router