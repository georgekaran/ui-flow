const express = require('express')
const router = express.Router()

const Module = require('../models/module')

router.post('/', async (req, res) => {
    try {
        const { title, link, modules } = req.body
        const module = await Module.create({ title, link })

        await Promise.all(modules.map(async module1 => {
            const subModule = new Module({ ...module1 })
            await subModule.save()
            module.modules.push(subModule)
        }))

        await module.save()

        res.send({ module })
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Erro ao criar um novo módulo' })
    }
})

router.get('/', async (req, res) => {
    try {
        const modules = await Module.find({modules: {$ne:[null]}})
        res.send({ modules })
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Erro ao puxar módulos' })
    }
})

module.exports = app => app.use('/module', router)