import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Client, Intents } from "discord.js";
import RiveScript from 'rivescript';
import {
	Worker
} from 'worker_threads';
import {Bot} from "./model/Bot.mjs";
import {BotService_Array} from "./model/BotService_Array.mjs";
let BotServiceInstance;
let bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })


const app = express();

// Enable ALL CORS request
app.use(cors())

const port = 3001

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

	
// Send a JSON error to the browser.
function error(res, message) {
	res.json({
	  status: 'error',
	  message: message,
	});
}

//get all bots
app.get('/', (req, res)=>{
	try{
		let myArrayOfBots;
		if( undefined == (myArrayOfBots = BotServiceInstance.getBots() )){
			throw new Error("No bots to get");
		}
		res.status(200).json(myArrayOfBots);
	}
	catch(err){
		console.log(`Error ${err} thrown... stack is : ${err.stack}`);
		res.status(404).send('NOT FOUND');
	}
});


//End point to get a bot
app.get('/:idd', (req, res)=>{
	let id = req.params.idd;
	if(!isInt(id)) {
		//not the expected parameter
		res.status(400).send('Mauvaise requete');
	}else{
		try{
			let myBot = BotServiceInstance.getBot(id);
			res.status(200).json(myBot);
		}
		catch(err){
			console.log(`Error ${err} thrown... stack is : ${err.stack}`);
			res.status(404).send('NOT FOUND');
		}
	}
});



//Update a bot
app.patch('/:id',(req,res)=>{
	let id = req.params.id;
	if(!isInt(id)) { 
		//not the expected parameter
		res.status(400).send('Mauvaise requete');
	}else{
		let newValues = req.body;
		console.log(newValues) //the client is responsible for formating its request with proper syntax.
		BotServiceInstance
			.updateBot(id, newValues)
			.then((returnString)=>{
				console.log(returnString);
				res.status(201).send('All is OK');
			})
			.catch((err)=>{
				console.log(`Error ${err} thrown... stack is : ${err.stack}`);
				res.status(400).send('Mauvaise requete');
			});	
	}	
});

//Replace a bot
app.put('/:id',(req,res)=>{
	let id = req.params.id;
	if(!isInt(id)) { 
		//not the expected parameter
		res.status(400).send('Mauvaise requete');
	}else{
		let newValues = req.body; //the client is responsible for formating its request with proper syntax.
		BotServiceInstance
			.replaceBot(id, newValues)
			.then((returnString)=>{
				console.log(returnString);
				res.status(201).send('Tout est correct');
			})
			.catch((err)=>{
				console.log(`Error ${err} thrown... stack is : ${err.stack}`);
				res.status(400).send('Mauvaise requete');
			});	
	}	
});



//Delete a bot
app.delete('/:id',(req,res)=>{
	let id = req.params.id;
	BotServiceInstance
		.removeBot(id) 
		.then((returnString)=>{
			console.log(returnString);
			res.status(200).send(id);
		})
		.catch((err)=>{
			console.log(`Error ${err} thrown`);
			res.status(204).send('NOT FOUND');
		});	
});


//Add a bot 
app.post('/',(req,res)=>{	
	let theBotToAdd = req.body;
	console.log(req.body);
	BotServiceInstance
		.addBot(theBotToAdd) 
		.then((returnString)=>{
			console.log(returnString);
			res.status(201).send(theBotToAdd);
		})
		.catch((err)=>{
			console.log(`Error ${err} thrown... stack is : ${err.stack}`);
			res.status(400).send('Mauvaise requete');
		});	
});

//lancement du thread associé au bot crée
app.post('/:id', async (req, res) => {
	req.headers['Content-Type'] = 'application/json';
	let id = req.params.id;
	console.log(req.params)

	if (!isInt(id)) {
		res.status(400).send('Mauvaise requete');
	} else {
		try {
				try {
					var worker = new Worker('./Bot_thread.mjs', {
						workerData: {
							botToTalk: BotServiceInstance.getBot(id)
						}
					});
					worker.on('error', (err) => {
						console.log(`Error ${err} thrown... stack is : ${err.stack}`);
						throw err;
					});
					worker.once('message', (port) => {
						res.status(200).json({
							link: `http://localhost:${port}`
						});
					});
				} catch (err) {
					console.log(`Error ${err} thrown... stack is : ${err.stack}`);
					res.status(404).send('NOT FOUND');
				}
			
		} catch (err) {
			console.log(`Bot introuvable : ${id}`);
			res.status(400).send('Mauvaise requete');
		}
	}
});

let discordBots = {};

BotService_Array.create().then(ts=>{
	BotServiceInstance=ts;
		let bots = ts.getBots();
		bots.forEach(bot => {
		if (bot.com == 'Discord'){
			console.log('Lancement de discordBot');
			try {
				var worker = new Worker('./Bot_thread.mjs', {
					workerData: {
						id: bot.id
					}
				});
				worker.on('error', (err) => {
					console.log(`Error ${err} thrown... stack is : ${err.stack}`);
					throw err;
				});
				worker.once('message', (port) => {
					console.log('Lancé');
					discordBots[bot.id] = worker;
				});
	
			} catch (err) {
				console.log(`Error ${err} thrown... stack is : ${err.stack}`);
			}
		}
	});
	app.listen(port, () => {
  		console.log(`Example app listening at http://localhost:${port}`)
	});
});

function isInt(value) {
	let x = parseFloat(value);
	return !isNaN(value) && (x | 0) === x;
  }



	
	
