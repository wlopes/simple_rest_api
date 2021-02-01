const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const config = require('./config.json')

let { projectName, dbName, password } = config.db
let { collections } = config

const mongoDBURL = `mongodb+srv://${projectName}:${password}@cluster0.ip7dw.mongodb.net/${dbName}?retryWrites=true&w=majority`

mainConnection = mongoose.createConnection(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

let models = {}

collections.forEach( c => {    
    let schema = new Schema({},{strict:false})
    models[c.slug] = {
        data:c,
        conn:mainConnection.model(c.name,schema)
    }
})

module.exports = models;