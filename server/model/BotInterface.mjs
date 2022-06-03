import RiveScript from 'rivescript';
let username = "local-user";
class BotInterface {
	constructor(botProfile) {
		this.botProfile = botProfile;
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
		return this.bot.reply("user", message);
	}


	
	async close(){
	}
}

export {BotInterface};