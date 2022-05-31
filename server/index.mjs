import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Client, Intents } from "discord.js";
import RiveScript from 'rivescript';

import {Bot} from "./model/Bot.mjs";
import {BotService_Array} from "./model/BotService_Array.mjs";
let botServiceInstance;

let a = true
// Create the bot.



const app = express();

//// Enable ALL CORS request
app.use(cors())
////

const port = 3001

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

/*app.post('/reply', getReply);

// POST to /reply to get a RiveScript reply.
function getReply(req, res) {

	var message = req.body.message;
	console.log("Entree reply");
	  sendMessage(message);
}

function sendMessage (text) {
	console.log("You say: " + text);
	  //$("#message").val("");
	  //$("#dialogue").append("<div><span class='user'>You:</span> " + text + "</div>");
	this.script.sortReplies();
	console.log("My name : " + username);
	script.reply(username,text).then(function(reply) {
	  console.log("The bot says: " + reply);
	});
}*/
	

app.get('/', (req, res)=>{
	try{
		let myArrayOfBots;
		if( undefined == (myArrayOfBots = botServiceInstance.getBots() )){
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
		res.status(400).send('BAD REQUEST');
	}else{
		try{
			let myBot = botServiceInstance.getBot(id);
			res.status(200).json(myBot.id);
		}
		catch(err){
			console.log(`Error ${err} thrown... stack is : ${err.stack}`);
			res.status(404).send('NOT FOUND');
		}
	}
});

app.patch('/:id',(req,res)=>{
	let id = req.params.id;
	if(!isInt(id)) { //Should I propagate a bad parameter to the model?
		//not the expected parameter
		res.status(400).send('BAD REQUEST');
	}else{
		let newValues = req.body; //the client is responsible for formating its request with proper syntax.
		botServiceInstance
			.updateBot(id, newValues)
			.then((returnString)=>{
				console.log(returnString);
				res.status(201).send('All is OK');
			})
			.catch((err)=>{
				console.log(`Error ${err} thrown... stack is : ${err.stack}`);
				res.status(400).send('BAD REQUEST');
			});	
	}	
});

app.delete('/:id',(req,res)=>{
	let id = req.params.id;
	try{
		let myBot = botServiceInstance.removeBot(id);
		a = false
		res.status(200).json(myBot.id);
	}
	catch(err){
		console.log(`Error ${err} thrown`);
		res.status(204).send('NOT FOUND');
	}

});


app.put('/:id',(req,res)=>{
	let id = req.params.id;
	if(!isInt(id)) { //Should I propagate a bad parameter to the model?
		//not the expected parameter
		res.status(400).send('BAD REQUEST');
	}else{
		let newValues = req.body; //the client is responsible for formating its request with proper syntax.
		botServiceInstance
			.replaceBot(id, newValues)
			.then((returnString)=>{
				console.log(returnString);
				res.status(201).send('All is OK');
			})
			.catch((err)=>{
				console.log(`Error ${err} thrown... stack is : ${err.stack}`);
				res.status(400).send('BAD REQUEST');
			});	
	}	
});



app.post('/',(req,res)=>{
	

	let theBotToAdd = req.body;
	console.log(req.body);
	botServiceInstance
		.addBot(theBotToAdd) 
		.then((returnString)=>{
			console.log(returnString);

			res.status(201).send(theBotToAdd.id);
		})
		.catch((err)=>{
			console.log(`Error ${err} thrown... stack is : ${err.stack}`);
			res.status(400).send('BAD REQUEST');
		});	
});

BotService_Array.create().then(ts=>{
	botServiceInstance=ts;
	/*botServiceInstance
		.catch((err)=>{console.log(err);});*/
	app.listen(port, () => {
  		console.log(`Example app listening at http://localhost:${port}`)
	});
});

function isInt(value) {
	let x = parseFloat(value);
	return !isNaN(value) && (x | 0) === x;
  }



	