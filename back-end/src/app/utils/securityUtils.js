const rateLimit = require('express-rate-limit');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Rate Limiting
const limitRequestPerSecond = (maxRequests, ) => rateLimit({
    max: maxRequests,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 
    message: 'Muitas requests por segundos.' // message to send
});

function generateToken(params = {}) {
    return jwt.sign(params, process.env.TOKEN_KEY, {
        expiresIn: 86400
    });
}

function comparePassword(password, userPassword) {
    return bcrypt.compare(password, userPassword);
}


module.exports = { 
    limitRequestPerSecond, 
    generateToken,
    comparePassword
}