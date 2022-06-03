import RiveScript from 'rivescript';

class BotInterface {
	constructor(botProfile) {
		this.botProfile = botProfile;
	}

	async loadBot() {
		var riveBot = new RiveScript();
		// console.log(`./bot-templates/${this.botProfile.template}.rive`);
		await riveBot.loadFile(`./brain/cerveau1.rive`);
		await riveBot.sortReplies();
		this.bot = riveBot;


	}

	async reply(message) {
		// var reply = await ;
		console.log(`Repling to :${message.replace(/[^a-zA-Z0-9 !?.]/g, '').toLowerCase()}`);
		return this.bot.reply(this.userProfile, message.replace(/[^a-zA-Z0-9 !?.]/g, '').toLowerCase());
	}


	
	async close(){
	}
}

export {BotInterface};