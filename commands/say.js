const Discord = require("discord.js");

exports.run = (client, message, args, level) => {
      message.delete().catch(console.error); // just incase if bot doesn't have permissions catch the error.
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
