const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const xss = require('xss-clean')
const helmet = require('helmet')
const os = require('os');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize')
const securityUtils = require('./app/utils/securityUtils')

class AppController {
    constructor() {
        this.express = express()

        this.enviromentVariables();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(bodyParser.json({ limit: '2mb' }));
        this.express.use(bodyParser.urlencoded({ limit: '2mb', extended: true, parameterLimit: 2000 }));
        this.express.use(cookieParser());
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });

        // Data Sanitization against XSS
        this.express.use(xss());

        // Extra protection using helmet
        this.express.use(helmet())

        // Preventing SQL/NoSQL Injection Attacks
        this.express.use(mongoSanitize());

        this.express.use('/images/', express.static(path.join(os.homedir(), "images/")))

        // Preventing DOS Attacks
        this.express.use('*', securityUtils.limitRequestPerSecond(100), (req, res, next) => {
            next() // pass control to the next handler
        })
    }

    routes() {
        require('./app/controllers/v1/index')(this.express)
    }

    enviromentVariables() {
        require('dotenv').config({ path:__dirname + (process.env.NODE_ENV === 'test' ? '/../.env.test' : '/../.env') });
        require('dotenv').config({ path:__dirname + '/resources/.env.message_pt'})
    }
}

module.exports = new AppController().express