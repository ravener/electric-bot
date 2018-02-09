const Discord = require("discord.js");

exports.run = async(client, message, args, level) => {
const responses = [
   'It is certain',
   'It is decidedly so',
   'without a doubt',
   'Yes definitely',
   'You may rely on it',
   'As I see it, Yes',
   'Most likely',
   'Outlook good',
   'Yes',
   'Signs point to yes',
   'Reply hazy try again',
   'Ask again later',
   'Better not tell you now',
   'Cannot predict now',
   'Concentrate and ask again',
   'Dont count on it',
   'My reply is no',
   'My sources say no',
   'Outlook not so good',
   'Very doubtful'
];
let think = message.channel.send("<a:typing:408438059516821515> 8ball is thinking...");
await client.wait(3000);
think.delete();

const question = args.join(" ");
const embed = new Discord.RichEmbed()
   .setTitle(question)
   .setAuthor(message.author.username, message.author.avatarURL)
   .setDescription(`${responses.random()}`)
   .setColor(0x0000FF)
   message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eightball', 'ball'],
  permLevel: "User"
};

exports.help = {
  name: "8ball",
  category: "Fun",
  description: "Asks the magic 8ball a question",
  usage: "8ball <question>"
};
