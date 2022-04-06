const Discord = require('discord.js');
const client = new Discord.Client({
   intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES
   ]
});

const {token} = require('./config.json');


client.once('ready', () => {
   console.log('Félicitations, votre bot Discord a été correctement initialisé !');
});

client.on("message", message => {
   if (message.content === "!ping") {
     message.channel.send("Pong.")
   }
 })

client.login(token);