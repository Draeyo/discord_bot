var Discord = require('discord.js');
var bot = new Discord.Client();
var request = require("superagent");
var ytdl = require('ytdl-core');

var token = 'MjM4NzQ3Nzk2NTI4ODI0MzI4.C0rbNA.2Rb39zQbM078-rwxMacw9PK3008'
var prefix = '!';

bot.on("debug", (msg) => console.log("[debug]", msg));
bot.on("warn", (msg) => console.log("[warn]", msg));

const LOADDIR = "./music/"
const streamOptions = { seek: 0, colume: 1 };

bot.on('ready', () => {
		console.log('READY');
});

bot.on('message', msg => {
		var input = msg.content.toLowerCase();
		var user = msg.author.username;
		var parsed = msg.content.split(" ");
		var channel = msg.channel.name;
		var voiceChannel = msg.member.voiceChannel;

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
				msg.channel.sendMessage('List of available commands :\n\`w ping\nw hi\nw test\nw avatar\nw bdo\nw fs\nw help\`', { split: true })
						.then(msg => console.log('User ' + user + ' asked for help in channel ' + channel))
						.catch(console.error);
		}
		else if (input === 'whisper') {
				msg.reply('Hi! My name is Whisper and as you can see, i\'m a bot!\nType \'w help\' to get the list of commands you can use on me.', { tts: true })
						.then(msg => console.log('User ' + user + ' directly asked for whisper in channel ' + channel))
						.catch(console.error);
		}
		else if (input === prefix + 'konami') {
				msg.channel.sendMessage(':arrow_up::arrow_up::arrow_down::arrow_down::arrow_left::arrow_right::arrow_left::arrow_right::regional_indicator_b::regional_indicator_a:', { split: true })
						.then(msg => console.log('Sent konami code url to ' + user + ' in channel ' + channel))
						.catch(console.error);
		}
		// VOICE
		else if (input === prefix + 'join') {
				if (voiceChannel !== undefined) { 
						voiceChannel.join()
						.then(connection => console.log('connected to voice channel ' + voiceChannel))
						.catch(console.error);
					}
		}
		else if (input === prefix + 'stop') {
				if (voiceChannel) {
					voiceChannel.leave();
				}
		}
		else if (input === prefix + 'leave') {
				if (voiceChannel) {
						voiceChannel.leave();
				}
		}
		else if (input.startsWith(prefix + 'play')) {
				var rest = msg.content.split(" ");
				rest.splice(0, 1);
				rest = rest.join(" ");
				var filePath = LOADDIR + rest + '.mp3';
				voiceChannel.join()
				.then(connection => {const dispatcher = connection.playFile(filePath);})
				.catch(console.error);
		}
		else if (input.startsWith(prefix + 'yt')) {
				var rest = msg.content.split(" ");
				rest.splice(0, 1);
				rest = rest.join(" ");
				voiceChannel.join()
				.then(connection => {
						const stream = ytdl(rest, { filter: 'audioonly' });
						const dispatcher = connection.playStream(stream, streamOptions);
				}).catch(console.error);
		}
});

bot.login(token);
