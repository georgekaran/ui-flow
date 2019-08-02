const rateLimit = require('express-rate-limit');

// Rate Limiting
const limitRequestPerSecond = (maxRequests, ) => rateLimit({
    max: maxRequests,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 
    message: 'Muitas requests por segundos.' // message to send
});

module.exports = { limitRequestPerSecond,  }