const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const path = require('path');

exports.run = async(client, message, args, level) => {
    const { stdout, stderr, err } = await exec(`git pull`);
    if (err) return console.error(err);
    const out = [];
    if (stdout) out.push(stdout);
    if (stderr) out.push(stderr);
    await message.channel.send(out.join('---\n'), { code: true });
    if (!stdout.toString().includes('Already up-to-date.')) {
     client.commands.get("ping").run(client, message, args, level);
    }
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['git', 'pull'],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "update",
  category: "System",
  description: "updates the bot by pulling from its git repository.",
  usage: "update"
};