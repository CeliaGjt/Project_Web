import { Mouth } from './Mouth.mjs';
import {
	Client,
	Intents
} from 'discord.js';

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
		this.client.login("OTYxMjc5NzI1Njc2OTQ1NDgw.Gyoi9G.44uP32ZzxOKSIcgj318fUQ8pBbjW47nOFaqg88");
	
		
	}

	async close() {
		this.client.destroy();
	}
}

export {
	Mouth_Discord
};