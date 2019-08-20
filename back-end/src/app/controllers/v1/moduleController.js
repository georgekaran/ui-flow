const express = require('express')
const router = express.Router()

const Module = require('../../models/module')

router.post('/', async (req, res) => {
    try {
        const { title, link, modules } = req.body
        let module
        if (req.body.icon) {
            module = await Module.create({ title, link, icon: req.body.icon })
        } else {
            module = await Module.create({ title, link })
        }

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
        const subModules = await Module.aggregate([
            { "$unwind": "$modules" },
            { "$unwind": "$modules._id" },
            { $match: { modules: { $ne: [] } } },
            {
                "$group": {
                    "_id": null,
                    "modules": { "$push": "$modules._id" }
                }
            }
        ]);
        const modules = await Module.find({
            $or: [{
                _id: {
                    $nin: subModules[0].modules
                },
                modules: { $eq: [] }
            },
            { modules: { $ne: [] } }]
        })
        res.send({ modules })
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Erro ao puxar módulos' })
    }
})

router.delete('/', async (req, res) => {
    try {
        await Module.deleteMany({})
        res.send({ message: "Módulo deletado com sucesso!" })
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Erro ao deletar módulo' })
    }
})

module.exports = app => app.use('/api/v1/module', router)