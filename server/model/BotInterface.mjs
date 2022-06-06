import RiveScript from 'rivescript';

class BotInterface {
	constructor(botProfile) {
		this.botProfile = botProfile;
	}

	async loadBot() {
		//charger un nouveau cerveau pour le bot
		var riveBot = new RiveScript();
		await riveBot.loadFile("./brain/"+this.botProfile.cerveau+".rive");
		await riveBot.sortReplies();
		this.bot = riveBot;


	}


	async reply(message) {
		console.log(`Réponse au message :${message}`);
		return this.bot.reply("user", message);
	}


	
	async close(){
	}
}

export {BotInterface};