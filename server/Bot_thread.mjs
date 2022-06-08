import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
	BotService_Array
} from './model/BotService_Array.mjs';

import {
	workerData,
	parentPort
} from 'worker_threads';




const app = express();


//// Enable ALL CORS request
app.use(cors());
////

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

const envoyé_Bot= workerData.botToTalk;



var bot;
const { Mouth_Discord } =  await import('./model/Mouth_Discord.mjs');
const {	Mouth } =  await import('./model/Mouth.mjs');




// Instancie un bot local ou discord selon ses caractéristiques 

if (envoyé_Bot.com=="Discord"){
	bot = new Mouth_Discord(envoyé_Bot);
	}
else{
	bot = new Mouth(envoyé_Bot);
	}

bot.loadBot();
var port =  envoyé_Bot.port;


// Patch pour la réponse
app.patch('/', async (req, res) => {
	req.headers['content-type'] = 'application/json';
	let message = req.body.message;
	if (!isString(message)) {
		res.status(400).send('BAD REQUEST');
	} else {
		console.log(message);
		var reply = await bot.reply(message);
		console.log(reply);
		res.status(200).json(reply);
	}
});

// requete GET
app.get('/', async (req, res) => {
	res.status(200).json(bot);
});


// delete pour fermer le mouth
app.delete('/', async (req, res) => {
	console.log(' Mouth de '+envoyé_Bot.name+ ' se ferme');
	await bot.close();
	res.status(200).send('Fini');
	console.log('Au revoir !');
	process.exit();
});



app.listen(port, () => {
	console.log(`Bot listening at http://localhost:${port}`);
});
parentPort.postMessage(port);




function isString(myVar) {
	return (typeof myVar === 'string' || myVar instanceof String);
}


