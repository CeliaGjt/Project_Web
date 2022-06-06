import RiveScript from "rivescript";
import { Client, Intents} from 'discord.js';

let newPortDispo = 3002;

class Bot{

  static id = this.id;
  static name = this.name;
  static cerveau = this.cerveau;
  static port = this.port;
  static com = this.com;


  constructor(data){   
    if(undefined != data.id) {
      if(!isInt(data.id)){
        throw new Error("Création de Bot: l'id n'est pas un Int");
      }
      this.id = data.id;
    } else {
      this.id = parseInt(    Math.floor(Math.random() * Math.floor(10000))     );
    }
    if(undefined != data.name) {
      if(!isString(data.name)){
        throw new Error("Création de bot : le nom n'est pas un String");
      }
      this.name = data.name;
    } else {
      this.name = "";
    }
    if(undefined != data.cerveau) {
      if(!isString(data.cerveau)){
        throw new Error("Création de bot : le cerveau n'est pas un String");
      }
      this.cerveau = data.cerveau;
    } else {
      this.cerveau = "";
    }
    if(undefined != data.com) {
      if(!isString(data.com)){
        throw new Error("Création de bot : le canal de communication n'est pas un String");
      }
      this.com = data.com;
    } else {
      this.com = "";
    }
    if (this.com=="Discord"){
      if(undefined != data.token) {
        if(!isString(data.token)){
          throw new Error("Création de bot : le token n'est pas un String");
        }
        this.token = data.token;
      } else {
        this.token = "";
      }
    }

    this.port = newPortDispo;
    newPortDispo+=1;
  }

  
  static isBot(anObject){
    // check if mandatory fields are there
    let hasMandatoryProperties = Object.keys(this).every(key=> anObject.hasOwnProperty(key));
    // we should also check the property values (if are strings, etc ... as in constructor) 
    if(!isInt(anObject.id)){
      throw new Error("Création de Bot: l'id n'est pas un Int");
    }
    if(!isString(anObject.name)){
      throw new Error("Création de bot : le nom n'est pas un String");
    }
    if(!isString(anObject.cerveau)){
      throw new Error("Création de bot : le cerveau n'est pas un String");
    }
    if(!isString(anObject.com)){
      throw new Error("Création de bot : le canal de communication n'est pas un String");
    } 
    if(!isString(anObject.token)){
      throw new Error("Création de bot : le token n'est pas un String");
    }
    return hasMandatoryProperties;
  }

  static isValidProperty(propertyName,propertyValue) {
    if(!this.hasOwnProperty(propertyName)){
      return false;
    }
    // we should also check the property values (if are strings, etc ... as in constructor) 
    if(propertyName == id && !isInt(propertyValue)){
      throw new Error("l'id n'est pas un Int");
    }
    if(propertyName == name && !isString(propertyValue)){
      throw new Error("le nom n'est pas un String");
    }
    if(propertyName == cerveau && !isString(propertyValue)){
      throw new Error("le cerveau n'est pas un String");
    }
    if(propertyName == com && !isString(propertyValue)){
      throw new Error("le canal de communication n'est pas un String");
    } 
    if(propertyName == token && !isString(propertyValue)){
      throw new Error("le token n'est pas un String");
    }
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



export {Bot}