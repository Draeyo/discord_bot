var Discord = require('discord.js');
var bot = new Discord.Client();

var prefix = 'w ';

bot.on('ready', () => {
	console.log('READY');
});

bot.on('message', msg => {
	if (msg.content.toLowerCase() === prefix + 'ping') {
		msg.reply('pong', { split: true });
	}
	else if (msg.content.toLowerCase() === prefix + 'hi') {
		msg.reply('hey there!', { split: true });
	}
});

bot.login('MjM4NzQ3Nzk2NTI4ODI0MzI4.CvbBmg.dsMntCwqkTEtRd4qlQ_83KTgisc');
