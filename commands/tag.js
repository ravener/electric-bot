// Testing command, actually it belongs to rewrite version
// im working on, this cmd looked a bit hard so i wanted
// to test it first.

const { tag } = require("../util/db.js");

exports.run = (client, message, args) => {
  
    const action = args[0];
    if(!action) return message.reply("Invalid usage, usage: `" + "tag <add|delete|list|TAGNAME>" + "`");
    switch(action) {
      case "add": {
        const name = args[1];
        const content = args.slice(2).join(" ");
        if(!name || !content) {
          message.reply("Must provide name and content, usage: `tag add <Name> <Some content>`");
          break;
        }
        const t = new tag({ guild: message.guild.id, user: message.author.id, name, content });
        t.save((err) => {
          if(err) this.client.logger.error(err);
          else message.channel.send(`Successfully saved tag \`${name}\``);
        });
        break;
       }
      case "delete": {
        if(!message.member.permissions.has("MANAGE_GUILD") && message.author.id !== this.client.config.ownerID) {
          message.reply("You do not have permissions to use this");
          break;
        }
        const name = args[1];
        tag.remove({ guild: message.guild.id, name }, (err) => {
          if(err) {
            client.logger.error(err);
            return message.reply("Something went wrong");
          } else {
            return message.channel.send(`Deleted, tag ${tag}`);
          }
        });
        break;
      }
      case "list": {
        tag.find({ guild: message.guild.id }, (err, tags) => {
          if(err) {
            client.logger.error(err);
            return message.reply("Something went wrong");
          } else {
            message.channel.send(tags.map(x => "*" + x.name + "*"), { split: "\n" });
          }
        });
        break;
      }
      default: {
        tag.findOne({ guild: message.guild.id, name: args[0] }, (err, tag) => {
          if(err) {
            client.logger.error(err);
            return message.reply("Something went wrong");
          } else {
            message.channel.send(tag.content);
          }
        });
        break;
      }
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "tag",
  category: "System",
  description: "Simple tag system, under BETA",
  usage: "tag <add|delete|list|TAGNAME>"
};