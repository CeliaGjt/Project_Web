import { BotInterface } from './BotInterface.mjs';
import {
	Client,
	Intents
} from 'discord.js';

class BotInterface_Discord extends BotInterface {
	constructor(botProfile) {
		super(botProfile);
	}


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
				message.channel.send("Exprime toi mieux")
			}
		});
	}
})
		
		console.log('...Loaded');
		this.client.login(this.botProfile.token);
	
		
	}

	async close() {
		this.client.destroy();
	}
}

export {
	BotInterface_Discord
};