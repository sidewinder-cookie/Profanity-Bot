const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');

client.on ('ready', () => {
	console.log("I'm Here!")
});

client.on('message' , message => {
	if(message.content === 'fuck') {
		message.reply('tut tut tut')
	}

});

client.login(settings.token);