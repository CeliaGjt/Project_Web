import RiveScript from 'rivescript';

class BotInterface {
	constructor(botProfile, userProfile) {
		this.botProfile = botProfile;
		this.userProfile = userProfile;
	}

	async loadBot() {
		var riveBot = new RiveScript();
		await riveBot.loadFile("./brain/"+this.botProfile.cerveau+".rive");
		await riveBot.sortReplies();
		this.bot = riveBot;


	}


	async reply(message) {
		// var reply = await ;
		console.log(`Repling to :${message}`);
		return this.bot.reply(userProfile.name, message);
	}


	
	async close(){
	}
}

export {BotInterface};