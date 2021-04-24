const express = require('express');
const { query } = require('../lib/db')
const SQL = require('@nearform/sql');
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const { v4: uuid } = require('uuid');
const router = express.Router()

const { addUser, getUserByEmail } = require("../data/users")
const { upload } = require("../middlewares/multipart")

// add request body validation
router.post('/user', (req, res, next) => {
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

                //    const sql = SQL`INSERT INTO users (id, mail, password, first_name, last_name,phone_number) VALUES (${id}, ${email}, ${password},${firstName},${secondName},${phone});`;

                // await query(sql).then(async () => {
                //     const userQueryById = SQL`SELECT * FROM users WHERE id = ${id}`
                //     const newUser = await query(userQueryById)
                //     // res.send({ msg: "user added successfully", obg: newUser });
                // })  
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
            if (result) {
                const token = jwt.sign({ id: user.id }, 'secret');
                console.log(user.id)
                res.send({ msg: "user added successfully", token, user: { mail: user.mail, id: user.id } });
            }
            else {
                res.status(401).send("incorrect password")
            }
        }
    });
})

// router.put('/:userId/picture_url',auth , upload.single('image'), async(req,res)=>{

// })

module.exports = router