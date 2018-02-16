exports.run = (client, message, args, level) => {
	if(!args) return message.reply("You must mention choices to pick from, seperated by commas.");
	let msg = args.join(" ");
	let choice = msg.split(",");
	if(choice.lenght < 2) return message.reply("You must include atleast 2 choices");
	message.channel.send(`:thinking:`)
	.then(async(msg) => {
		await client.wait(2000);
		msg.edit(`I think \`${choice.random()}\``);
	}).catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['choose'],
  permLevel: "User"
};

exports.help = {
  name: "pick",
  category: "Fun",
  description: "Pick a random choice.",
  usage: "pick <choice1>, <choice2> and more choices seperated by comma."
};
