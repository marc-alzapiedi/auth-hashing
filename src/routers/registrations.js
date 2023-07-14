const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const user = await prisma.user.create({
          data: {
            username,
            password: hash
          },
        });
        res.status(201).json({ user })
      });
    });
  } else {
    return res.json({ error });
  }
});

module.exports = router;
