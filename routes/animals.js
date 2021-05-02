const express = require('express');
const { query } = require('../lib/db')
const SQL = require('@nearform/sql');
const jwt = require('jsonwebtoken')
const fs = require('fs')

const { v4: uuid } = require('uuid');
const router = express.Router()
const { getAnimals, createAnimal, deleteAnimal, getAnimalById, changeAnimal, getAnimalByType, updateAnimalPictureUrl } = require("../data/animals");
const { getUserByEmail, getUserById } = require('../data/users')
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/multipart');
const { uploadToCloudinary } = require('../lib/cloudinary');



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

router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const animal = await getAnimalById(id)
    res.send({ animal })
})

router.post('/:type', auth, async (req, res) => {
    const type = req.params;
    console.log(type)
    const animals = await getAnimalByType(type)
    res.send({ animals })
})

router.put('/:id', auth, async (req, res) => {
    const id = req.params;
    const { nameAnimal, type } = req.body
    const changes = changeAnimal(nameAnimal, type, id)
})
router.put('/:id/picture_url', auth, upload.single('image'), async (req, res) => {
    const result = await uploadToCloudinary(req.file.path)
    await updateAnimalPictureUrl(req.params.id, result.secure_url)
    fs.unlinkSync(req.file.path)
    res.send({ pictureUrl: result.secure_url })
})
// updateAnimalPictureUrl

router.get("/me", auth, async (req, res) => {
    const userId = req.user.id;
    const animals = await getAnimalsByUserId(userId)
    res.send({ animals })
})

router.delete("/:animalId", auth, async (req, res) => {
    // console.log(req.user.id)
    const userId = req.user.id;
    const { animalId } = req.params
    // console.log("animalId",animalId)
    const animal = await getAnimalById(animalId)
    // console.log("animal",animal)
    // const user = await getUserById(userId)
    // const canDeleteAnimal = animal.userId === userId || user.role === 'admin';
    // if (!canDeleteAnimal) {
    //     res.status(403).send({ message: 'only animal created can delete' })
    //     return;
    // }
    try {
        await deleteAnimal(animalId);
        res.status(202).send({ message: 'animal deleted successfully' })
    } catch (err) {
        next(err)
    }
})
module.exports = router
