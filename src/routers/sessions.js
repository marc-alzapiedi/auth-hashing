const express = require('express');
const router = express.Router();
const secret = process.env.JWT_SECRET

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
    const {username, password} = req.body
    let error

    if (username && password) {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        if (user) {

            bcrypt.compare(password, userVerify.password, async function(err, result) {
                if (result) {
                    const token = jwt.sign({username}, secret)
                    return res.json({token})
                } else {
                    error = "incorrect password"
                    res.json({ error })
                }
            });
        } else {
            error = "username not found"
            res.json({ error })
        }
    } else {
        error = "must include username and password"
        res.json({ error })
    }
});

module.exports = router;
