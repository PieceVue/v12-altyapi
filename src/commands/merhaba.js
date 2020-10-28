exports.run = (client, message, params, prefix, settings) => {
    message.channel.send("Merhaba Dünya :wave:");
};

exports.config = {
    names: ["merhaba"],
    description: "Test Komutu",
    usage: "merhaba",
    enabled: true,
    devOnly: false
}