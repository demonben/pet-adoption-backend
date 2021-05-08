const express = require('express');
const { query } = require('../lib/db')
const SQL = require('@nearform/sql');
const jwt = require('jsonwebtoken')
const fs = require('fs')

const { v4: uuid } = require('uuid');
const router = express.Router()
const { getAnimals, createAnimal, deleteAnimal, getAnimalById, changeAnimal, getAnimalByType, updateAnimalPictureUrl, addOwner, changeStatus, getOwnPets } = require("../data/animals");
const { getUserByEmail, getUserById } = require('../data/users')
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/multipart');
const { uploadToCloudinary } = require('../lib/cloudinary');



router.get("/", async (req, res, next) => {
    const results = await getAnimals()
    res.send({ animals: results })
});

router.post('/', auth, async (req, res) => {
    console.log("infoAnimal", req.body)
    const { id, nameAnimal, type, adoptionStatus, height, weight, color, bio, hypoallergenic, dietaryRestriction, breedOfAnimal, urlAnimal } = req.body;
    await createAnimal(id, nameAnimal, type, adoptionStatus, urlAnimal, height, weight, color, bio, hypoallergenic, dietaryRestriction, breedOfAnimal, req.user.id)
    res.send({ animal: { id, nameAnimal, type, adoptionStatus, urlAnimal, height, weight, color, bio, hypoallergenic, dietaryRestriction, breedOfAnimal } })
})

router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const animal = await getAnimalById(id)
    res.send({ animal })
})

router.get('/type/:type', auth, async (req, res) => {
    const type = req.params.type;
    console.log("type route", type)
    const animals = await getAnimalByType(type)
    console.log("routes", animals)

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

router.get("/me", auth, async (req, res) => {
    const userId = req.user.id;
    const animals = await getAnimalsByUserId(userId)
    res.send({ animals })
})

router.delete("/:animalId", auth, async (req, res) => {
    const userId = req.user.id;
    const { animalId } = req.params
    const animal = await getAnimalById(animalId)
    const user = await getUserById(userId)
    const canDeleteAnimal = animal.userId === userId || user.role === 'admin';
    if (!canDeleteAnimal) {
        res.status(403).send({ message: 'only animal created can delete' })
        return;
    }
    try {
        await deleteAnimal(animalId);
        res.status(202).send({ message: 'animal deleted successfully' })
    } catch (err) {
        next(err)
    }
})

router.post("/take_pet/:pet_id/:status/:ownerId", auth, async (req, res) => {
    try {

        const userId = req.user.id;
        const { pet_id, status, ownerId } = req.params
        addOwner(pet_id, userId, status)
        changeStatus(pet_id, status, userId)
    } catch (err) {
        console.error(err)
    }
})

router.get('/my_pets/:owner_id', auth, async (req, res) => {
    try {
        const ownerId = req.params.owner_id
        const animals = await getOwnPets(ownerId)
        res.send({ animals })
    } catch (err) {
        console.error(err)
    }
})

router.put('/return/:petId', async (req, res) => {
    try {
        console.log("got back")
        const status = req.body
        const { petId } = req.params
        changeStatus(petId, null, null)
    } catch (err) {
        console.error(err)
    }
})


module.exports = router
