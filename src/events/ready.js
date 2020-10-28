const client = global.client;
const chalk = require('chalk');

exports.run = () => {
    console.log(chalk.green.bold(`[BOT] ${client.user.tag} giriş yaptı!`));
}

exports.config = {
    name: "ready"
}