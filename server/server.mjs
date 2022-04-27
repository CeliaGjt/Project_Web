import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {Bot} from "./model/Bot.mjs";
import {BotService_ArrayImpl} from "./model/BotService_ArrayImpl.mjs";
let botServiceInstance;

const app = express();

//// Enable ALL CORS request
app.use(cors())

const port = 3001

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

//End point to get all the bots
app.get('/', (req, res)=>{
	try{
		let myArrayOfBots;
		if( undefined == (myArrayOfBots = botServiceInstance.getBots() )){
			throw new Error("No bots to get");
		}
		res.status(200).json(myArrayOfTasks);
	}
	catch(err){
		console.log(`Error ${err} thrown`);
		res.status(404).send('NOT FOUND');
	}
});

app.listen(port, () => console.log(`This app is listening on port ${port}`));