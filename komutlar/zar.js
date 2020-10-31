const Discord = require("discord.js");
exports.run = function(client, message, args) {
  if (args[0]) {
    if (isNaN(args[0])) return message.channel.send("Sayı gir");
    var zar = Math.floor(Math.random() * parseInt(args[0])) + 1;
    message.channel.send(zar);
  } else {
    var zar = Math.floor(Math.random() * 6) + 1;
    message.channel.send(zar);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["zar"],
  permLevel: 0
};

exports.help = {
  name: "zar",
  description: "zar atarsınız.",
  usage: "zar"
};
