const mongoClient = require('mongodb').MongoClient

const host = process.env.DB_HOST || "localhost"
const port = process.env.DB_PORT || "27017"
const database = process.env.DB_DATABASE || "ui-flow-test"
const connection = `mongodb://${host}:${port}/${database}`

module.exports = (collection) => mongoClient.connect(connection, async (err, db) => {
    console.log(db.db(database).collection(collection).deleteMany({}))
});