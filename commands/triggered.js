const Discord = require("discord.js");

exports.run = async(client, message, args, level) => {
  const user = message.mentions.members.first() || message.author;
try {
  await message.channel.send(new Discord.Attachment(
  await client.api.triggered(user.displayAvatarURL + "?size=2048"), "triggered.gif"));
} catch(e) {
 console.error(e);
 }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "triggered",
  category: "Fun",
  description: "Somebody is triggered.",
  usage: "triggered [@user]"
};
