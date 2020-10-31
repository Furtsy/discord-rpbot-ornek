const Discord = require("discord.js");
const db = require("quick.db");
exports.run = function(client, message, args) {
  let kişi = message.author;
  let para = db.fetch(`para.${kişi.id}`); //parayı çekiyoruz
  if (args[0] == "item") {
    let miktar = args[1];
    if (!miktar) return message.reply("itemi ne kadar alcaksan o kadar gir");
    if (para < miktar * 10) return message.channel.send("Paran yetersiz"); //burda parası alcağı miktarı aşıyormu diye bakıyoruz tanesi 10muş gibi düşünün
    db.add(`item.${kişi.id}`, miktar); //burda itemi ekliyoruz
    message.channel.send("Başarılı şekilde satın aldın");
    db.subtract(`para.${kişi.id}`, miktar * 10); //burda ise paradan çıkatıyoruz
  } else {
    message.channel.send("Girdiğin değer yok veya hata oluştu");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["al"],
  permLevel: 0
};

exports.help = {
  name: "al",
  description: "item alırsınız",
  usage: "al"
};
