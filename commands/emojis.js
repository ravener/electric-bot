exports.run = (client, message, args, level) => {
  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
  message.channel.send(emojiList).catch(err => message.channel.send("Looks like there's no emojis in this server"));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['emotes'],
  permLevel: "User"
};

exports.help = {
  name: "emojis",
  category: "Miscelaneous",
  description: "Sends all emoji list of the server.",
  usage: "emojis"
};
