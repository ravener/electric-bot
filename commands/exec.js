const exec = require('child_process').exec;

exports.run = async(client, message, args, level) => {
    exec(`${args.join(' ')}`, (error, stdout) => {
      const response = (error || stdout);
      message.channel.send(`Ran: ${args.join(" ")}\n${response}`, {code: "asciidoc", split: "\n"}).catch(console.error);
    });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "exec",
  category: "System",
  description: "Executes command prompt code",
  usage: "exec [...code]"
};