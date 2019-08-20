const express = require('express')
const router = express.Router()

const userValidationsMiddleware = require('../../middlewares/validations/userValidations')
const User = require('../../models/user')

router.get('/', async (req, res) => {
    res.send("Teste user");
})

router.post('/', userValidationsMiddleware, async (req, res) => {
    res.send("Teste user");
})

router.delete('/', async (req, res) => {
    res.send("Teste user");
})

router.put('/', userValidationsMiddleware, async (req, res) => {
    res.send("Teste user");
})

module.exports = app => app.use('/api/v1/user', router)