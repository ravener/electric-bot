const Discord = require("discord.js");

exports.run = async(client, message, args, level) => {
  let user = message.mentions.members.first() ? message.mentions.members.first().user : message.author
  let avatar = user.displayAvatarURL.endsWith(".gif") ? user.displayAvatarURL + "?size=2048" : user.displayAvatarURL;
try {
  await message.channel.send(new Discord.Attachment(
  await client.api.triggered(avatar), "triggered.gif"));
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
