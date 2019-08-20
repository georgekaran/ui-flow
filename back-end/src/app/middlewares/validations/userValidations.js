const User = require('../../models/user')

module.exports = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
        return res.status(400).send({ message: "Email já cadastrado, tente outro e-mail."})
    }
    next()
}