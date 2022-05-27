import {Bot} from "./Bot.mjs";
import { Client, Intents } from "discord.js";
class BotService_Array{
	constructor(data){ 
		this.array = new Array();
		this.db = {};
	}

	static async create(){ 
		return new BotService_Array();
	}

	async addBot(anObject){
		let newBot;
		try{
			newBot = new Bot(anObject);
		}catch(err){
			throw err; //throwing an error inside a Promise
		}
		this.array.push(newBot);
		return `added bot of id ${newBot.id}`;
	}

	//from PUT
	async replaceBot(id, anObject){
		let index = this.array.findIndex(e=> e.id == id);	
		if(index >-1 ){
			//At this point, you may have a safeguard to verify if the given Object is a Bot
			if(Bot.isBot(anObject)){
				/// Just replace it already!
				this.array.splice(index,1,anObject);
				return "Done REPLACING";
			}
			throw new Error(`given object is not a Bot : ${anObject}`);
		}
		throw new Error(`cannot find Bot of id ${id}`);
	}

	//from PATCH
	async updateBot(id, anObject){
		let index = this.array.findIndex(e=> e.id == id);	
		if(index >-1 ){
			//At this point, you may have a safeguard to verify if the fields of the given Object are from a Bot
			for(let property in anObject){
				if(!Bot.isValidProperty(property,anObject[property])){
					throw new Error(`given property is not a valid Bot property : ${anObject}`);	
				}
			}
			//At this point, we are sure that all properties are valid and that we can make the update.
			for(let property in anObject){
				(this.array)[index][property] = anObject[property];
			}
			return "Done UPDATING";
		}
		throw new Error(`cannot find Bot of id ${id}`);
	}

	async removeBot(id, bot){

		let index = this.array.findIndex(e=> e.id == id);
		if(index >-1 ){
			this.array.splice(index,1);
			return `removed Bot of id ${id}`;
		}
		throw new Error(`cannot find Bot of id ${id}`);
		
	}

	getBot(id){
		let index = this.array.findIndex(e=> e.id == id);
		if(index >-1 ){
			return  (this.array)[index];
		}
		throw new Error(`cannot find Bot of id ${id}`);	
	}

	getBots(){
		return this.array;
	}

}

export {BotService_Array}