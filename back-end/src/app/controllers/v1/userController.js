const express = require('express')
const router = express.Router()

const authMiddleware = require('../../middlewares/auth')
const userValidationsMiddleware = require('../../middlewares/validations/userValidations')
const User = require('../../models/user')
const { getPropertyValue } = require('../../utils/messageDeliver')

//router.use(authMiddleware)

router.get('/', async (req, res) => {
    console.log()
    const users = await User.find({});
    res.send({ users });
})

router.post('/', userValidationsMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send({ message: getPropertyValue('message.insert.already.exists', ['Email']), error: false })
        }
        await User.create(req.body)
        return res.status(200).send({ message: getPropertyValue('message.insert.sucess', ['Usuário']), error: false })
    } catch (err) {
        return res.status(400).send({ message: err, error: true })
    }
})

router.delete('/', async (req, res) => {
    res.send("Teste user");
})

router.put('/', userValidationsMiddleware, async (req, res) => {
    res.send("Teste user");
})

module.exports = app => app.use('/api/v1/user', router)