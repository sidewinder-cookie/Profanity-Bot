const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');
const profanities = require("swearjar")

const request = require('snekfetch');

client.on ('ready', () => {
	console.log("I'm Here!")
});

client.on('message' , message => {

	// Profanity Checker
	if(profanities.profane(message.content)) {
		message.reply('tut tut')
	}
	
	// Enigma motivation
	const mention = client.user.toString();
	if(message.content.startsWith(mention)) {
		const content = message.content.slice(mention.length + 1).toLowerCase();
		const keywords = ["motivation", "inspiration", "quotes", "enigma", "the enigma", "officialenigma_"]
		if (keywords.some(keyword => message.content.includes(keyword))){
			request.get('https://www.instagram.com/officialenigma_/?__a=1')
			
		}
	}
});

client.login(settings.token);