const express = require('express')
const bodyParser = require('body-parser')
const os = require('os');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var cors = require('cors')

const app = express()
// app.use(session({
//     name: 'sid',
//     resave: false,
//     saveUninitialized: false,
//     secret: 'ssh!quiet,it',
//     cookie: {
//         maxAge: 7200,
//         sameSite: true,
//         secure: process.env.NODE_ENV == 'prod'
//     }
// }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

//app.use('/images/', express.static(global.imagesPath))

require('./app/controllers/index')(app)

app.use('/', (req, res) => res.send('UIFlow is up and running!'))

app.listen(5000, () => {
    console.log('Server is up on port 5000')
})