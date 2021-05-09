const express = require('express');
const { query } = require('../lib/db')
const SQL = require('@nearform/sql');
const jwt = require('jsonwebtoken')
const { auth } = require('../middlewares/auth');

const bcrypt = require('bcrypt')

const { v4: uuid } = require('uuid');
const router = express.Router()

const { getUsers, addUser, getUserByEmail, getUserById, deleteUser, changeUser } = require("../data/users")
const { upload } = require("../middlewares/multipart")

router.get("/", async (req, res, next) => {
    const results = await getUsers()
    res.send({ users: results })
});

// add request body validation
router.post('/user', (req, res, next) => {
    console.log("object")
    try {
        const id = uuid();
        const { email, password, firstName, secondName, phone } = req.body;
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) next(err)
            else {
                const user = await getUserByEmail(email)
                if (user) {
                    res.status(403).send('user already exist with this email')
                    return;
                }
                await addUser(id, email, hash, firstName, secondName, phone)
                res.send({ email })
            }
        })
    } catch (err) {
        console.error(err)
        res.status(400).send(err.message);
    }
})


// add request body validation
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    const user = await getUserByEmail(email)
    if (!user) {
        res.status(404).send("user not found with this email")
        return;
    }

    bcrypt.compare(password, user.passwordHash, function (err, result) {

        if (err) next(err);
        else {
            console.log(result)

            if (result) {
                const token = jwt.sign({
                    id: user.id,
                    name: user.first_name,
                    lastName: user.last_name
                }, 'secret');

                
                res.send({ msg: "user added successfully", token, user: { mail: user.mail, id: user.id } });
            }
            else {
                res.status(401).send("incorrect password")
            }
        }
    });
})
router.delete("/:userId", auth, async (req, res) => {
    // console.log(req.user.id)
    const userId = req.user.id;
    const userIdDelete = req.params
    // console.log("userIdDelete", userIdDelete)
    // console.log("animalId",animalId)
    const user = await getUserById(userIdDelete)
    // console.log("user", user)
    // const user = await getUserById(userId)
    // const canDeleteAnimal = animal.userId === userId || user.role === 'admin';
    // if (!canDeleteAnimal) {
    //     res.status(403).send({ message: 'only animal created can delete' })
    //     return;
    // }
    try {
        console.log(userIdDelete)
        await deleteUser(userIdDelete);
        // console.log("object2")
        res.status(202).send({ message: 'user deleted successfully' })
    } catch (err) {
        // next(err)
    }
})

router.get('/:id', auth, async (req, res) => {
    console.log("object")
    const id = req.params.id;
    console.log(id)
    const user = await getUserById(id)
    res.send({ user })
})

router.put('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const userNewInfo = req.body
    const changes = changeUser(userNewInfo, id)
})

router.get('mail/:email', auth, async (req, res, next) => {
    try {
        const { email } = req.params
        console.log('before')
        const user = await getUserByEmail(email)
        console.log('after')

        res.send({ user })

    } catch (err) {
        next(err)
    }
})

module.exports = router