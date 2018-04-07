// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  client.user.setActivity(`+help | ${client.guilds.size} Servers`);
  // We need to add this guild to our settings!
  client.settings.set(guild.id, client.config.defaultSettings);
};