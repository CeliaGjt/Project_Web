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
import { randomBytes, randomInt } from 'crypto';



const app = express();


//// Enable ALL CORS request
app.use(cors());
////

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

const basicBot= workerData.botToTalk;



var bot;
const { BotInterface_Discord } =  await import('./model/BotInterface_Discord.mjs');
const {	BotInterface } =  await import('./model/BotInterface.mjs');




if (basicBot.com=="Discord"){
	bot = new BotInterface_Discord(basicBot);
	}
else{
	bot = new BotInterface(basicBot);
	}

bot.loadBot();
var port =  basicBot.port +randomInt(1,10000);

app.patch('/', async (req, res) => {
	req.headers['content-type'] = 'application/json';
	let message = req.body.message;
	if (!isString(message)) {
		console.log(`not the expected parameter ${JSON.stringify(req.body)} ${!isString(message)}`);
		//not the expected parameter
		res.status(400).send('BAD REQUEST');
	} else {
		console.log(message);
		var reply = await bot.reply(message);
		console.log(reply);
		res.status(200).json(reply);
	}
});


app.get('/', async (req, res) => {
	res.status(200).json(bot);
});

app.delete('/', async (req, res) => {
	console.log(' BotInterface de '+basicBot.name+ ' se ferme');
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


