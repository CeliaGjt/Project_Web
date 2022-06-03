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
let a = true


let username = "local-user";


const app = express();

//// Enable ALL CORS request
app.use(cors())
////

const port = 3001

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 



app.post('/reply', getReply);
  
function error_handler(loadcount, err) {
  console.log('Error loading batch #' + loadcount + ': ' + err + '\n');
}

// POST to /reply to get a RiveScript reply.
function getReply(req, res) {

	var message = req.body.message;
	console.log("Entree reply");

  
	script.reply(username, "Hello, bot!").then(function(reply) {
		console.log("The bot says: " + reply);
	  });
	  sendMessage(message);
}

function sendMessage (text) {
	console.log("You say: " + text);
	  //$("#message").val("");
	  //$("#dialogue").append("<div><span class='user'>You:</span> " + text + "</div>");
	script.sortReplies();
	console.log("tabernacle : " + username);
	script.reply(username,text).then(function(reply) {
	  console.log("The bot says: " + reply);
	});
}


	
// Send a JSON error to the browser.
function error(res, message) {
	res.json({
	  status: 'error',
	  message: message,
	});
}

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
		res.status(400).send('BAD REQUEST');
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

app.patch('/:id',(req,res)=>{
	let id = req.params.id;
	if(!isInt(id)) { //Should I propagate a bad parameter to the model?
		//not the expected parameter
		res.status(400).send('BAD REQUEST');
	}else{
		let newValues = req.body; //the client is responsible for formating its request with proper syntax.
		BotServiceInstance
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
		let myBot = BotServiceInstance.removeBot(id);
		a = false
		res.status(200).json(myBot);
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
		BotServiceInstance
			.replaceTask(id, newValues)
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
	BotServiceInstance
		.addBot(theBotToAdd, bot,a) 
		.then((returnString)=>{
			console.log(returnString);
			a=true

			res.status(201).send(theBotToAdd);
		})
		.catch((err)=>{
			console.log(`Error ${err} thrown... stack is : ${err.stack}`);
			res.status(400).send('BAD REQUEST');
		});	
});


app.post('/:id', async (req, res) => {
	req.headers['Content-Type'] = 'application/json';
	let id = req.params.id;
	console.log(req.params)

	// let login = 'matt';
	if (!isInt(id)) {
		//not the expected parameter
	
		res.status(400).send('BAD REQUEST');
	} else {
		try {
			// Seul les bot communiquant via l'interface local peuvent être lancer ce cette manière
				try {
					var worker = new Worker('./worker.mjs', {
						workerData: {
							id: id,	
						}
					});
					worker.on('error', (err) => {
						console.log(`Error ${err} thrown... stack is : ${err.stack}`);
						throw err;
					});
					worker.once('message', (port) => {
						// const port = 4000 + id * 100 + encode(login);
						res.status(200).json({
							link: `http://localhost:${port}`
						});
					});
				} catch (err) {
					console.log(`Error ${err} thrown... stack is : ${err.stack}`);
					res.status(404).send('NOT FOUND');
				}
			
		} catch (err) {
			console.log(`Bot not found : ${id}`);
			res.status(400).send('BAD REQUEST');
		}
	}
});



BotService_Array.create().then(ts=>{
	BotServiceInstance=ts;
	/*BotServiceInstance
		.catch((err)=>{console.log(err);});*/
	app.listen(port, () => {
  		console.log(`Example app listening at http://localhost:${port}`)
	});
});

function isInt(value) {
	let x = parseFloat(value);
	return !isNaN(value) && (x | 0) === x;
  }

  bot.on('ready', function () {console.log("Je suis connectée !")})

  bot.on('messageCreate', message => {
		  if(message.channel.name == "general" && message.author.id != bot.application.id && a==true)
		  {
			  let entry = message.content 
			  script.reply(message.author.name, entry).then(function(reply)
				  {
					  var output = reply;
					  if(output != "ERR: No Reply Matched")
					  {
						  message.channel.send(output)
					  }
					  else
					  {
						  message.channel.send("Exprime toi mieux")
					  }
				  }
			  );
		  }
	  }
  )

	
	
