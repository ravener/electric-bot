
exports.run = (client, message, args, level) => {
    message.channel.send(`Invite me to your server: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=470281463`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['inv'],
  permLevel: "User"
};

exports.help = {
  name: "invite",
  category: "Miscelaneous",
  description: "Want me to in you server?",
  usage: "invite"
};
