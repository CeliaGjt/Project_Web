import {Bot} from "./Bot.mjs";
import { Client, Intents } from "discord.js";
class BotService_Array{
	constructor(data){ 
		this.array = new Array();
	}

	static async create(){ 		
		return new BotService_Array();
	}

	//from POST
	async addBot(anObject){
		let newBot;
		try{
			newBot = new Bot(anObject);
		}catch(err){
			throw err; //throwing an error inside a Promise
		}
		this.array.push(newBot);
		return `bot avec l'id ${newBot.id} ajouté`;
	}

	//from PUT
	async replaceBot(id, anObject){
		let newBot;
		try{
			newBot = new Bot(anObject);
		}catch(err){
			throw err; //throwing an error inside a Promise
		}

		let index = this.array.findIndex(e=> e.id == id);	
		if(index >-1 ){
				this.array.splice(index,1,newBot);
				return "REMPLACEMENT terminé";
		}
		throw new Error(`Ne trouve pas de bot d'id ${id}`);
	}

	//from PATCH
	async updateBot(id, anObject){
		let index = this.array.findIndex(e=> e.id == id);	
		if(index >-1 ){
			//verify if the fields of the given Object are from a Bot
			// for(let property in anObject){
			// 	if(!Bot.isValidProperty(property,anObject[property])){
			// 		throw new Error(`given property is not a valid Bot property : ${anObject}`);	
			// 	}
			// }
			//All properties are valid, we can make the update.
			for(let property in anObject){
				(this.array)[index][property] = anObject[property];
			}
			return "MISE A JOUR terminée";
		}
		throw new Error(`Ne trouve pas de bot d'id ${id}`);
	}

	//from DELETE
	async removeBot(id, bot){

		let index = this.array.findIndex(e=> e.id == id);
		if(index >-1 ){
			this.array.splice(index,1);
			return `Bot d'id ${id} supprimé`;
		}
		throw new Error(`Ne trouve pas de bot d'id ${id}`);	
	}

	getBot(id){
		let index = this.array.findIndex(e=> e.id == id);
		if(index >-1 ){
			return  (this.array)[index];
		}
		throw new Error(`Ne trouve pas de bot d'id ${id}`);	
	}

	getBots(){
		return this.array;
	}

}

export {BotService_Array}