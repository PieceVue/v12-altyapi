const { settings, commands } = global;

exports.run = async (message) => {
    let client = message.client;
    let mentionprefix = new RegExp(`^<@!?${client.user.id}> `);
    if (message.author.bot || (!settings.bot.prefixes.some(prefix => message.content.startsWith(prefix)) && !message.content.match(mentionprefix))) return;
    let prefix;
    if (!message.content.match(mentionprefix)) { for (const newprefix of settings.bot.prefixes) { if (message.content.startsWith(newprefix)) prefix = newprefix; } } else { let newprefix = "<@!" + client.user.id + "> "; if (message.content.match(mentionprefix)) prefix = newprefix; }
    let params = message.content.split(" ");
    const commandName = message.content.substring(prefix.length);
    if (!message.content.match(mentionprefix)) { params = params.slice(1); } else { params = params.slice(2) }
    const command = commands.get(commandName);
    if (!command || !command.config.enabled || (command.config.devOnly && !settings.bot.developers.includes(message.author.id))) return;
    if (command) command.run(client, message, params, prefix, settings);
}

exports.config = {
    name: "message"
}