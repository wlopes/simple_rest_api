const express = require('express')
var bodyParser = require('body-parser');

const config = require('./config.json')
const models = require('./connection.js')
const utils = require('./utils');

const app = express();
app.use(bodyParser.json());

const port = config.port || 3000;
const host = config.host || 'http://localhost'

//Cria as rotas para cada um dos models
Object.keys(models).forEach(k => {
  let path = `/${k}`;
  let model = models[k] 
  
  //create
  app.post(path, (req,res) => {    
    let attributes = model.data.attributes;
    let validAttrs = utils.getValidAttributes(req.body, attributes)
    
    model.conn.create(validAttrs).then(result => {
      res.status(200).json(result)
    })    
  })

  //read
  app.get(path, (req,res) => {
    let attributes = model.data.attributes;    
    let validAttrs = utils.getValidAttributes(req.query, attributes)    
    
    console.log(validAttrs)

    model.conn.find(validAttrs, null, {limit:20}, function(err, docs){
      res.status(200).send(docs);
    })
  })

  //readByID
  app.get(path + '/:id', (req,res) => {
    model.conn.findById(req.params.id, function(err, docs){
      res.status(200).send(docs);
    })
  })

  //updateByID
  app.post(path + '/:id', (req,res) => {
    let attributes = model.data.attributes;
    let validAttrs = utils.getValidAttributes(req.body, attributes)
    
    model.conn.findByIdAndUpdate(req.params.id, validAttrs, function(err, docs){
      model.conn.findById(req.params.id, function(err, docs){
        res.status(200).send(docs);
      })      
    })
  })

  //deleteByID
  app.delete(path + '/:id', (req,res) => {    
    model.conn.findByIdAndRemove(req.params.id, function(err,docs){
      res.status(200).json(docs)
    })
  })
  
})

app.listen(port, () => {
  console.log(`Listening on ${host}:${port}`)
})