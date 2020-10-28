const { Discord, Client } = require('discord.js');
const client = global.client = new Client({ fetchAllMembers: true });
const settings = global.settings = require('./settings.json');
const commands = global.commands = new Map();
const fs = require('fs');
const chalk = require('chalk');

console.log(chalk.blue(`━━━━━━━━━━━━━━━━━━━KOMUTLAR YÜKLENİYOR━━━━━━━━━━━━━━━━━━━`));
fs.readdirSync('./src/commands', { encoding: "utf-8" }).sort().filter(file => file.endsWith(".js")).forEach((file) => {
  let command = require(`./src/commands/${file}`);
  if(!command || (command.config && command.config.names && command.config.names.length <= 0) || !command.run) return console.log(chalk.red(`[COMMAND-HANDLER] ${file} adlı komut yüklenemedi.`));
  if(command.config && (command.config.names && command.config.names.length > 0)) command.config.names.forEach(name => commands.set(name, command));
  console.log(chalk.yellow(`[COMMAND-HANDLER] ${file} adlı komut başarıyla yüklendi.`));
});

console.log(chalk.blue(`━━━━━━━━━━━━━━━━━━━EVENTLER YÜKLENİYOR━━━━━━━━━━━━━━━━━━━`));
fs.readdirSync('./src/events', { encoding: "utf-8" }).sort().filter(file => file.endsWith(".js")).forEach((file) => {
  let event = require(`./src/events/${file}`);
  if(!event.run || !event.config || (event.config && !event.config.name)) return console.log(chalk.red(`[EVENT-HANDLER] ${file} adlı event yüklenemedi.`));
  client.on(event.config.name, event.run);
  console.log(chalk.yellow(`[EVENT-HANDLER] ${file} adlı event başarıyla yüklendi.`));
});

client.login(settings.bot.token).catch(async err => { 
  await console.log(chalk.red(`[BOT] Token yanlış veya yeniden oluşturulmuş.`));
  await process.exit();
 });