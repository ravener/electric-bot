const { inspect } = require("util");

exports.run = (client, message, args, level) => {
	let cmd = client.commands.get(args.join(" "));
	if(!cmd) return message.reply("Command not found");
	message.channel.send(`\`\`\`${inspect(cmd.toString)}\`\`\``);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['src'],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "source",
  category: "System",
  description: "Views source code for a command",
  usage: "source <command>"
};