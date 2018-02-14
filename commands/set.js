const { inspect } = require("util");

// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars

  // Retrieve current guild settings
  const settings = client.settings.get(message.guild.id);
  
  // First, if a user does `-set add <key> <new value>`, let's add it
  if (action === "add") {
    if (!key) return message.reply("Please specify a key to add");
    if (settings[key]) return message.reply("This key already exists in the settings");
    if (value.length < 1) return message.reply("Please specify a value");

    // `value` being an array, we need to join it first.
    settings[key] = value.join(" ");
  
    // One the settings is modified, we write it back to the collection
    client.settings.set(message.guild.id, settings);
    message.reply(`${key} successfully added with the value of ${value.join(" ")}`);
  } else
  
  // Secondly, if a user does `-set edit <key> <new value>`, let's change it
  if (action === "edit") {
    if (!key) return message.reply("Please specify a key to edit");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    if (value.length < 1) return message.reply("Please specify a new value");
  
    settings[key] = value.join(" ");

    client.settings.set(message.guild.id, settings);
    message.reply(`${key} successfully edited to ${value.join(" ")}`);
  } else
  
  // Thirdly, if a user does `-set del <key>`, let's ask the user if they're sure...
  if (action === "del") {
    if (!key) return message.reply("Please specify a key to delete.");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    
    // Throw the 'are you sure?' text at them.
    const response = await client.awaitReply(message, `Are you sure you want to permanently delete ${key}? This **CANNOT** be undone.`);

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response)) {

      // We delete the `key` here.
      delete settings[key];
      client.settings.set(message.guild.id, settings);
      message.reply(`${key} was successfully deleted.`);
    } else
    // If they respond with n or no, we inform them that the action has been cancelled.
    if (["n","no","cancel"].includes(response)) {
      message.reply("Action cancelled.");
    }
  } else
  
  if (action === "get") {
    if (!key) return message.reply("Please specify a key to view");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    message.reply(`The value of ${key} is currently ${settings[key]}`);
  } else {
    message.channel.send(`== Settings ==
Use: ${settings.prefix}set edit <key> <value> to edit a settings.
== Welcome ==
welcome messages can use placeholders that will be replaced on sending time, available placeholders:
{{user}} mentions a user.
{{server}} the server name.
{{count}} the server's member count.
example: ${settings.prefix}set edit welcomeMessage Welcome {{user}} to {{server}} we now have {{count}} members!

• welcomeMessage :: ${settings.welcomeMessage}
• welcomeEnabled :: ${settings.welcomeEnabled}
• welcomeChannel :: ${settings.welcomeChannel}
Note: for welcome channel you must provide exact channel name and its case sensitive, make sure bot has permissions to post in the channel as well.

== Leave ==
Coming soon!

== Prefix ==
Prefix is what you need to use the bot like +ping means + is prefix, current prefix:
• prefix :: ${settings.prefix}

== ModLogs ==
Modlogs is meant to log every mod actions like kick ban etc current modlog channel is,
• modLogChannel :: ${settings.modLogChannel}
Modlogs doesn't work at the moment.

== Admin and Mod Role ==
This are mod and admin roles they must be set so your server mods and admins to be able to use some commands.
they are case sensitive and must be spelled exactly as rolename.
Current settings:
• adminRole :: ${settings.adminRole}
• modRole :: ${settings.modRole}
== Settings ==
`, {code:"asciidoc"});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: "Administrator"
};

exports.help = {
  name: "set",
  category: "System",
  description: "View or change settings for your server.",
  usage: "set <view/get/edit> <key> <value>"
};
