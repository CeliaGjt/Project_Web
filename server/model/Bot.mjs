import RiveScript from "rivescript";
import { Client, Intents} from 'discord.js';

class Bot{

  static id = this.id;
  static name = this.name;
  static cerveau = this.cerveau;
  static token= this.token;


  constructor(data){   //id,title,comment,tags
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
        throw new Error("Bot Creation : passed Title is not a string");
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
        throw new Error("Bot Creation : passed cerveau is not a cerveau");
      }
      this.token = data.token;
    } else {
      this.token = "";
    }  

  }
  
  static async create(name, cerveau){ 
    return new Bot(name, cerveau);
  }

  static async seConnecter(mouth,cerveau,token) {
    

    
		mouth.on('ready', function () { console.log("Je suis connectée !") })
	
		mouth.on('messageCreate', message => {
			if (message.channel.name == "general" && message.author.id != 961279725676945480  && message.author.id !=979857187193094196) {
				let entry = message.content
				cerveau.reply(message.author.name, entry).then(function (reply) {
					var output = reply;
					if (output != "ERR: No Reply Matched") {
						message.channel.send(output)
					}
					else {
						message.channel.send("Exprime toi mieux")
					}
				});
			}
		})

    mouth.login(token)
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

function loading_done(cerveau) {
  console.log("Le bot a fini d'apprendre ");
  cerveau.sortReplies();
}


function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}




export {Bot}