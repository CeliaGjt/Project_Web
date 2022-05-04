const RiveScript= require("rivescript")
const { Client, Intents } = require("discord.js")

class mouth{



	constructor(data){ 
		const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

		const {token} = require('./config.json');

		var chloe = new RiveScript();

		chloe.loadDirectory("../project_Web/server/brain").then(loading_done).catch(loading_error)
		
		bot.login(token)
	}


}
function loading_done() {
	console.log("Chloé a fini d'apprendre ");
	chloe.sortReplies();
	}


	function loading_error(error, filename, lineno) {
	console.log("Error when loading files: " + error);
	}

	bot.on('ready', function () {console.log("Je suis connectée !")})

	bot.on('messageCreate', message => {
			if(message.channel.name == "general" && message.author.id != bot.application.id)
			{
				let entry = message.content 
				chloe.reply(message.author.name, entry).then(function(reply)
					{
						var output = reply;
						if(output != "ERR: No Reply Matched")
						{
							message.channel.send(output)
						}
						else
						{
							message.channel.send("Exprime toi mieux")
						}
					}
				);
			}
		}
	)
	