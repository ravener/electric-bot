const logger = require("../util/Logger.js");

exports.run = (client, message, args, level) => {
	if(!message.guild.me.permissions.has("MANAGE_EMOJIS")) return message.reply("I don't have manage emojis permissions.");
	if(args.length < 1) return message.reply("Please include an ID for the emoji to copy, in this format `copy emoji_id emoji_name`");
	if(!parseInt(args.join(' ')[0])) return message.reply("That doesn't seem an ID to me");
	if(!args.join(' ')[1]) return message.reply("Please add a name for the emoji, `copy emoji_id emoji_name`");
	message.guild.createEmoji(`https://cdn.discordapp.com/emojis/${args.join(' ')[0]}`, args.join(' ')[1])
	.then(emoji => {
		message.channel.send(`:thumbsup: copied emoji ${emoji.name} <$:{emoji.name}:${emoji.id}>`);
	}).catch(e => {
		message.reply("Looks like i couldn't find the emoji, make sure you provided correct ID");
		logger.error(e);
	});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['emoji'],
  permLevel: "Moderator"
};

exports.help = {
  name: "copy",
  category: "Fun",
  description: "Copies an emoji by ID",
  usage: "copy <id> <name>"
};