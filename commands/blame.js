exports.run = async(client, message, args, level) => {
	if(!message.guild) {
		await message.channel.send(await client.api.blame(args.length > 1 ? args.join(" ") : message.author.username)).catch(console.error);
	} else {
		 const user = message.mentions.members.first() ? message.mentions.members.first() : message.member;
		 await message.channel.send(await client.api.blame(user.displayName)).catch(console.error);
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "blame",
  category: "Fun",
  description: "Blame someone",
  usage: "blame [@user]"
};