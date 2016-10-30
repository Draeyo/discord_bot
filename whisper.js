var Discord = require('discord.js');
var bot = new Discord.Client();

var token = 'MjM4NzQ3Nzk2NTI4ODI0MzI4.CvbBmg.dsMntCwqkTEtRd4qlQ_83KTgisc'
var prefix = 'w ';

bot.on('ready', () => {
	console.log('READY');
});

bot.on('message', msg => {
	var input = msg.content.toLowerCase();
	var user = msg.author.username;
	var parsed = msg.content.split(" ");
	var channel = msg.channel.name;

	if (input === prefix + 'ping') {
		msg.channel.sendMessage('pong', { split: true })
			.then(msg => console.log('Sent a reply to ' + user + ' in channel ' + channel))
			.catch(console.error);
	}
	else if (input === prefix + 'hi') {
		msg.reply('Hey there!', { split: true })
			.then(msg => console.log('Sent a reply to ' + user + ' in channel ' + channel))
			.catch(console.error);
	}
	else if (input === prefix + 'test') {
		msg.reply('OK', { split: true })
			.then(msg => console.log('Sent a reply to ' + user + ' in channel ' + channel))
			.catch(console.error);
	}
	else if (input === prefix + 'avatar') {
		msg.reply(msg.author.avatarURL)
			.then(msg => console.log('Sent avatar URL to ' + user + ' in channel ' + channel))
			.catch(console.error);
	}
	else if (input === prefix + 'bdo') {
		msg.reply('http://imgur.com/a/6awSk', { split: true })
			.then(msg => console.log('Sent bdo url to ' + user + ' in channel ' + channel))
			.catch(console.error);
	}
	else if (input === prefix + 'fs') {
		msg.reply('http://i.imgur.com/7bfkYan.png123abc44', { split: true })
			.then(msg => console.log('Sent fs file to ' + user + ' in channel ' + channel))
			.catch(console.error);
	}
	else if (input === prefix + 'help') {
		msg.channel.sendMessage('ping\nhi\ntest\navatar\nbdo\nfs\nhelp', { split: true })
			.then(msg => console.log('User ' + user + ' asked for help in channel ' + channel))
			.catch(console.error);
	}
});

bot.login(token);
