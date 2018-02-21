const exec = require("child_process").exec;
const fs = require("fs");

exports.run = (client, message, args, level) => {
	const code = args.join(" ");
 fs.writeFile("python.py", code, () => {
 	exec(`python python.py`, (error, stdout) => {
      const response = (error || stdout);
      message.channel.send(`${response}`, {code: "py", split: "\n"}).catch(console.error);
    });
 });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['py'],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "python",
  category: "System",
  description: "Evaluates arbitrary python.",
  usage: "python [...code]"
};