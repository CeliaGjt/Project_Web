import {
	BotInterface
} from './BotInterface.mjs';
import {
	Client,
	Intents
} from 'discord.js';

class BotInterface_Discord extends BotInterface {
	constructor(botProfile) {
		super(botProfile);
	}


	async loadBot() {
		console.log('Loading...');
		super.loadBot();
		console.log('...Loading...');
		this.client = new Client({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
		});

		console.log("ici")
		
		// console.log('...Client...');
		// // When the client is ready, run this code (only once)
		// this.client.once('ready', () => {
		// 	console.log('Ready!');
		// });

		this.client.once('ready', function () {console.log("Je suis connectée !")})

		console.log('...Messages...');
		// this.client.on('messageCreate', async interaction => {

		// 	if (interaction.author.bot) return;
		// 	if (interaction.content) {
		// 		this.reply(interaction.content.replace(interaction.client.user.username,'')).then((res) => {
		// 			interaction.reply(res);
		// 		}).catch((res) => {
		// 			interaction.channel.send('Something went wrong, try again in a bit!');
		// 			console.error(`[${interaction.guild.name}]` + res);
		// 		});
		// 	} else if (interaction.content.toLowerCase().startsWith(`<@!${interaction.client.user.id}>`) || interaction.content.toLowerCase().startsWith(`<@${interaction.client.user.id}>`)) {
		// 		this.reply(interaction.content.replace(`<@!${interaction.client.user.id}>`,'').replace(`<@${interaction.client.user.id}>`,'')).then((res) => {
		// 			interaction.reply(res);
		// 		}).catch((res) => {
		// 			interaction.channel.send('Something went wrong, try again in a bit!');
		// 			console.error(`[${interaction.guild.name}]` + res);
		// 		});
		// 	}
		// });



	this.client.on('messageCreate', message => {
  	if(message.channel.name == "general" && message.author.id != this.client.application.id ){
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
		// Login to Discord with your client's token
		// this.client.login(this.com.option.token);
		this.client.login("OTYxMjc5NzI1Njc2OTQ1NDgw.G_uw50.fDCLUUbW5vRswA7kLa-EEoGJn151aXNDRTaFcY");
	
		
	}

	async close() {
		this.client.destroy();
	}
}

export {
	BotInterface_Discord
};