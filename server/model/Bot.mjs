import RiveScript from "rivescript";
import { Client, Intents} from 'discord.js';

class Bot{

  static id = this.id;
  static name = this.name;
  static cerveau = this.cerveau;
  static token = this.token;
  static script = this.script;

  constructor(data){   //constructeur: un bot est crée avec un id, un nom, un cerveau, un token de connexion à discord en renvoyant une erreur si le type donné n'est pas correct
    if(undefined != data.id) {
      if(!isInt(data.id)){
        throw new Error("Bot Creation : passed Id is not an integer");
      }
      this.id = data.id;
    } else {
      this.id = parseInt(    Math.floor(Math.random() * Math.floor(100000))     );
    }
    if(undefined != data.name) {
      if(!isString(data.name)){
        throw new Error("Bot Creation : passed Name is not a string");
      }
      this.name = data.name;
    } else {
      this.name = "";
    }
    if(undefined != data.cerveau) {
      if(!isString(data.cerveau)){
        throw new Error("Bot Creation : passed cerveau is not a cerveau");
      }
      this.cerveau = data.cerveau;
    } else {
      this.cerveau = "";
    }    
    if(undefined != data.token) {
      if(!isString(data.token)){
        throw new Error("Bot Creation : passed token is not a string");
      }
      this.token = data.token;
    } else {
      this.token = "";
    }
    this.script = new RiveScript(); 
    
  }
  
  static async create(name, cerveau){ 
    let bot = new Bot(name, cerveau);
    return bot;
  }

  async success_handler() {
    console.log('Brain loaded!');
    this.script.sortReplies();    
  }
  
  async error_handler(loadcount, err) {
    console.log('Error loading batch #' + loadcount + ': ' + err + '\n');
  }

  
  
  async seConnecter() { //permet de connecter un cerveau à "une bouche " sur l'interface discord avec un token
    this.script.loadFile("./server/brain/"+`${this.cerveau}`+".rive").then(this.success_handler()).catch(this.error_handler) 
    let username = "local-user";
    console.log("My name : " + username);
    this.script.reply(username,"brigitte").then(function(reply) {
      console.log("The bot says: " + reply);
    });
    let mouth = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
		mouth.on('ready', function () { console.log("Je suis connectée !") })
	
		mouth.on('messageCreate', message => {
			if (message.channel.name == "general" && message.author.id != 961279725676945480  && message.author.id !=979857187193094196) {
				let entry = message.content
				this.script.reply(message.author.name, entry).then(function (reply) {
					var output = reply;
					if (output != "ERR: No Reply Matched") {
						message.channel.send(output)
					}
					else {
						message.channel.send("Je n'ai pas compris, désolé")
					}
				});
			}
		})

    mouth.login(this.token)
	}

  static isBot(anObject){
    // check if mandatory fields are there
    let hasMandatoryProperties = Object.keys(this).every(key=> anObject.hasOwnProperty(key));
    // we should also check the property values (if are strings, etc ... as in constructor) 
    return hasMandatoryProperties;
  }

  static isValidProperty(propertyName,propertyValue) {
    if(!this.hasOwnProperty(propertyName)){
      return false;
    }
    // we should also check the property values (if are strings, etc ... as in constructor) 
    return true;
  }

}

function isInt(value) {
  let x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

function isString(myVar) {
  return (typeof myVar === 'string' || myVar instanceof String) ;
}

function isDate (x) 
{ 
  return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate); 
}

function isArrayOfStrings(value){
  if(!Array.isArray(value)) return false;
  for(let item of value){
    if(!isString(item)) return false;
  }
  return true;
}



export {Bot}