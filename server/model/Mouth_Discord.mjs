import { Mouth } from './Mouth.mjs';
import {
	Client,
	Intents
} from 'discord.js';
import { readFile } from "fs/promises";

const token = JSON.parse(await readFile('./model/config.json'));


class Mouth_Discord extends Mouth {
	constructor(bot) {
		super(bot);
	}

	// on rajoute les fonctions de discord 
	async loadBot() {
		super.loadBot();
		this.client = new Client({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
		});

		

		this.client.once('ready', function () {console.log("Je suis connectée !")})


			this.client.on('messageCreate', message => {
			if(message.channel.name == "general" && message.author.id != 979857187193094196 &&  message.author.id !=961279725676945480 ){
				let entry = message.content 
				console.log(entry)
				this.reply(entry).then(function(reply){
					var output = reply;
					if(output != "ERR: No Reply Matched"){
						message.channel.send(output)
					}
					else{
						message.channel.send("Désolé, je n'ai pas compris")
					}
				});
			}
		})
		
		console.log('...Chargement terminé');
		this.client.login(token.token);
	
		
	}

	async close() {
		this.client.destroy();
	}
}

export {
	Mouth_Discord
};