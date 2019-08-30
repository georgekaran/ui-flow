const mongoose = require('mongoose')

const host = process.env.DB_HOST || "localhost"
const port = process.env.DB_PORT || "27017"
const database = process.env.DB_DATABASE || "ui-flow"

mongoose.connect(`mongodb://${host}:${port}/${database}`, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
mongoose.Promise = global.Promise

module.exports = mongoose