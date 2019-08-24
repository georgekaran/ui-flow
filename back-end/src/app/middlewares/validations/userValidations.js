const User = require('../../models/user')
const Validation = require('./Validation')

const userValidation = new Validation(User)

module.exports = async (req, res, next) => {
    if (userValidation.isEverythingValid(req.body)) {
        next()
    } else {
        return res.status(400).send({ message: 'Erro nas validações do usuário', error: true })
    }
}