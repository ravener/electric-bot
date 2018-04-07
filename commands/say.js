const Discord = require("discord.js");

exports.run = (client, message, args, level) => {
      if(message.deletable) message.delete();
      message.channel.send(args.join(" "));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['talk'],
  permLevel: "User"
};

exports.help = {
  name: "say",
  category: "Miscelaneous",
  description: "Makes the bot repeat what you said",
  usage: "say <text>"
};