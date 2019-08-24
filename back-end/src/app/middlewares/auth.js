const jwt = require('jsonwebtoken')

const returnResponse = (res) => {
    return res.status(401).send({ message: 'Token inválido.', error: true })
}

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log("HEADER", req.headers.authorization)

    if (!authHeader) {
        return returnResponse(res);
    }

    const parts = authHeader.split(' ')

    if (!parts.length === 2) {
        return returnResponse(res);
    }

    const [ scheme, token ] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return returnResponse(res);
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) return returnResponse(res);
        
        req.userId = decoded.id
        return next()
    })
}