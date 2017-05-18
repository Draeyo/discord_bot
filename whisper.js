var Discord = require('discord.js');
var bot = new Discord.Client();
var request = require("superagent");
var ytdl = require('ytdl-core');
var now = new Date();
var fs = require('fs');

var token = fs.readFileSync('token.txt', 'utf-8').replace('\n', '');
var prefix = '!';

bot.on("debug", (msg) => console.log('[' + now + ']' + '[debug]', msg));
bot.on("warn", (msg) => console.log('[' + now + ']'+ '[warn]', msg));

const LOADDIR = "./music/"
const streamOptions = { seek: 0, colume: 1 };
//const voicePerm;
//const sleepTime;
var delmsg = false;
var perms;
var msgperm = false;

bot.on('ready', () => {
		console.log('READY');
		voicePerm = true;
		//perms = new Discord.Permissions(permissions);
});

bot.on('message', msg => {
		var input = msg.content//.toLowerCase();
		var user = msg.author.username;
		var parsed = msg.content.split(" ");
		var channel = msg.channel.name;
		var voiceChannel = msg.member.voiceChannel;
		var botAvatar = 'https://discordapp.com/api/v6/users/' + bot.user.id + '/avatars/' + bot.user.avatar + '.jpg';
		var guild = msg.member.guild;
		perms = msg.member.permissions;
		msgperm = msg.channel.permissionsFor(msg.member).hasPermission('MANAGE_MESSAGES');

		if (input === prefix + 'ping') {
				msg.channel.sendMessage('pong', { split: true })
				.then(msg => console.log('Sent a reply to ' + user + ' in channel ' + channel))
				.catch(console.error);
				msg.channel.sendFile(botAvatar);
				delmsg = true;
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
		else if (input.startsWith(prefix + 'avatar')) {
				var target = input.split(" ");
				target.splice(0, 1);
				target = target.join(" ");
				console.log('target : ' + target);
				var members = guild.members;
				for (let item of members) {
						if (target && item[1].user.username === target) {
								var targetAvatarURL = 'https://discordapp.com/api/v6/users/' + item[1].user.id + '/avatars/' + item[1].user.avatar + '.jpg';
								console.log('avatar of user : ' + item[1].user.username + ' with id : ' + item[1].user.id + ' asked.');
								msg.channel.sendFile(targetAvatarURL).then(msg => console.log(target + ' avatar asked by ' + user)).catch(console.error);
								delmsg = true;
						}
				}
				if (!delmsg)
						msg.channel.sendMessage('User ' + target + ' not found.').then(msg => console.log('User ' + target + ' not found for avatar command')).catch(console.error);
		}
		else if (input.startsWith(prefix + 'img')) {
				var rest = input.split(" ");
				rest.splice(0, 1);
				rest = rest.join(" ");
				if (rest) {
						msg.channel.sendFile(rest).then(msg => console.log('img : ' + rest + ' sent by ' + user)).catch(console.error);
						delmsg = true;
				}
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
				msg.channel.sendMessage('List of available commands :\n\`!ping\n!hi\n!test\n!avatar <user(optionnal)>\n!bdo\n!fs\n!help\n!yt\n!play\n!stop\n!join\n!leave\n!say\n!img\n\`', { split: true })
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
				.then(msg => console.log(now + ' :' + 'Sent konami code url to ' + user + ' in channel ' + channel))
				.catch(console.error);
		}
		else if (input === prefix + 'hello') {
				msg.channel.sendMessage('Hello ' + user + ' !', { tts: true })
				.then(msg => console.log('Hello ' + user + ' !'))
				.catch(console.error);
		}
		else if (input.startsWith(prefix + 'say') && voicePerm) {
				var things = msg.content.split(" ");
				things.splice(0, 1);
				things = things.join(" ");
				if (things.length > 50) {
						msg.channel.sendMessage('Casse pas les couilles ' + user).then(msg => console.log(user + 'tried to flood.')).catch(console.error);
				} else {
						msg.channel.sendMessage(things, { tts: true })
						.then(msg => console.log('Said : "' + things + '" to ' + user))
						.catch(console.error);
						delmsg = true;
				}
		}
/*		else if (input.startsWith(prefix + 'tg' && voicPerm) {
				var sleepDuration = msg.content.split(" ");
				sleepDuration.splice(0, 1);
				sleepDuration = sleepDuration.join(" ");
				if (filterInt(sleepDuration) {
						sleepDuration = parseInt(sleepDuration, 10);
						sleepTime = new Date() + (sleepDuration * 1000);
						voicePerm = false;
						msg.channel.sendMessage('Sleep. Wake up at ' + sleepTime).then(msg => console.log('Sleeping for ' + sleepDuration)).catch(console.error);
				} else {
						msg.channel.sendMessage('Invalid time syntax').then(msg => console.log('Invlid time syntax')).catch(console.error);
				}
		}
		else if (input === prefix + 'wakeup') {
				if (msg.member.hasPermission('KICK_MEMBERS')) {
						voicePerm = true;
						sleepTime = 0;
				}
		}*/
		// VOICE
		else if (input === prefix + 'join') {
				if (voiceChannel !== undefined) { 
						voiceChannel.join()
						.then(connection => console.log('connected to voice channel ' + voiceChannel))
						.catch(console.error);
					}
				delmsg = true;
		}
		else if (input === prefix + 'stop') {
				if (voiceChannel) {
					voiceChannel.leave();
				}
				delmsg = true;
		}
		else if (input === prefix + 'leave') {
				if (voiceChannel) {
						voiceChannel.leave();
				}
				delmsg = true;
		}
		else if (input.startsWith(prefix + 'play') && voicePerm) {
				var rest = msg.content.split(" ");
				rest.splice(0, 1);
				rest = rest.join(" ");
				var filePath = LOADDIR + rest + '.mp3';
				if (rest) {
						voiceChannel.join().then(connection => {
								const dispatcher = connection.playFile(filePath);
						}).catch(console.error);
				}
				delmsg = true;
		}
		else if (input.startsWith(prefix + 'yt')) {
				var rest = msg.content.split(" ");
				rest.splice(0, 1);
				rest = rest.join(" ");
				if (rest) {
						voiceChannel.join().then(connection => {
								const stream = ytdl(rest, { filter: 'audioonly' });
								const dispatcher = connection.playStream(stream, streamOptions);
						}).catch(console.error);
				}
				delmsg = true;
		}
});

bot.on('message', function(msg) {
		if (delmsg && msgperm) {
				msg.delete().catch(console.error);
				console.log(msg.author.username + '\'s message deleted.');
		}
		delmsg = false;
});

filterInt = function(value) {
		if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
				return Number(value);
		return NaN;
}

bot.login(token);
