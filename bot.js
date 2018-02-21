const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');
const profanities = require("swearjar");
const enigma = require('./enigma.json');

client.on ('ready', () => {
    console.log("I'm Here!");
});

function messageIsProfane(message) {
    message.author.sendMessage(`The message you sent to ${message.channel} contained profanity, please refrain from using it in the future!`);
    message.channel.send(`${message.author} sent an inappropriate message and was kicked.`);
    message.delete();
    if (message.member) {
        message.member.kick();
    }
    if (message.guild) {
        message.guild.owner.sendMessage(`The user ${message.author} sent an inappropriate message in ${message.guild}. Please take action.`);
    }
}

function doCommand(message, content) {
    console.log(content);
    const params = content.split(" ");
    const command = params[0];
    const arguments = params.slice(1);
    if (command === "motivation" || command === "enigma") {
        const node = enigma.user.media.nodes[Math.floor(Math.random() * enigma.user.media.nodes.length)];
        message.channel.send(new Discord.RichEmbed()
            .addField("Caption", node.caption)
            .setThumbnail(node.thumbnail_src));
    } else if (command === "advice") {
        message.reply(`todo`);
    }
}

client.on('message', message => {
    
    if (profanities.profane(message.content) || message.content.includes("banana")) {
        return messageIsProfane(message);
    }

    // Enigma motivation
    const mention = client.user.toString();
    console.log(message.content, mention);
	if(message.content.startsWith(mention)) {
        console.log(true);
		const content = message.content.slice(mention.length + 1).toLowerCase();
        doCommand(message, content);
	}
});

client.login(settings.token);