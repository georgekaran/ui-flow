const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const os = require('os');
const path = require('path');
const cookieParser = require('cookie-parser');
const xss = require('xss-clean')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const session = require('express-session');
const securityUtils = require('./app/utils/securityUtils')
var cors = require('cors')

//Load enviroment variables
require('dotenv').config();
require('dotenv').config({path:__dirname+'/resources/.env.message_pt'})

const app = express()
const appDir = path.join(os.homedir(), "images/");
global.imagesPath = appDir

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true, parameterLimit: 2000 }));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Data Sanitization against XSS
app.use(xss());

// Extra protection using helmet
app.use(helmet())

// Preventing SQL/NoSQL Injection Attacks
app.use(mongoSanitize());

app.use('/images/', express.static(global.imagesPath))

// Preventing DOS Attacks
app.use('*', securityUtils.limitRequestPerSecond(100), (req, res, next) => {
    next() // pass control to the next handler
})

require('./app/controllers/v1/index')(app)

app.use('/', (req, res) => res.send('UIFlow is up and running!'))

app.listen(5000, () => {
    console.log('Server is up on port 5000')
})