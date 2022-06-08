import RiveScript from 'rivescript';

class Mouth {
	constructor(bot) {
		this.bot = bot;
	}


	//  load le cerveau
	async loadBot() {
		var riveBot = new RiveScript();
		await riveBot.loadFile("./brain/"+this.bot.cerveau+".rive");
		await riveBot.sortReplies();
		this.bot = riveBot;


	}

	// réponse
	async reply(message) {
		console.log(`Réponse au message :${message}`);
		return this.bot.reply("user", message);
	}

}

export {Mouth};