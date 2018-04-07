const { MessageAttachment } = require("discord.js");

exports.run = async(client, message, args, level) => {
  const user = message.mentions.members.first() ? message.mentions.members.first().user : message.author;
try {
  await message.channel.send(new MessageAttachment(
  await client.api.triggered(user.displayAvatarURL({ format: png, size: 2048 })), "triggered.gif"));
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