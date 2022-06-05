import express from 'express';
const app = express()
const bots = require('./model/db.json')

/**
 * Import MongoClient & connexion à la DB
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'https://data.mongodb-api.com/app/data-rffab/endpoint/data/v1';
const dbName = 'projetWeb';
let db
 
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

/* 
app.use(express.json())

app.get('/:id', (req,res) => {
    res.status(200).json(req)
})

app.get('/:idd', (req,res) => {
    const id = parseInt(req.params.id)
    const bot = db.find(bot => bot.id === id)
    res.status(200).json(bot)
})

app.post('/:id', (req,res) => {
    db.push(req.body)
    res.status(200).json(db)
})
    app.put('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parking.name =req.body.name,
    parking.city =req.body.city,
    parking.type =req.body.type,
    res.status(200).json(parking)
})

app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parkings.splice(parkings.indexOf(parking),1)
    res.status(200).json(parkings)
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
}) */ 