const Discord = require("discord.js");
const db = require("quick.db");
const isImageUrl = require("is-image-url");
exports.run = function(client, message, args) {
  if (args[0] == "isim") {
    if (!args.slice(1).join(" "))
      return message.reply("Lütefen bir isim giriniz");
    message.channel.send("Başarılı şekilde kaydedildi");
    db.set(`karakter.isim.${message.author.id}`, args.slice(1).join(" "));
  } else if (args[0] == "fotoğraf") {
    if (!args[1]) return message.reply("Lütefen bir fotoğrag linki giriniz");
    if (!isImageUrl(args[1]))
      return message.reply("Düzgün bir fotoğraf linki giriniz");
    message.channel.send("Başarılı şekilde kaydedildi");
    db.set(`karakter.fotoğraf.${message.author.id}`, args[1]);
  } else if (args[0] == "kapak") {
    if (!args[1]) return message.reply("Lütefen bir fotoğrag linki giriniz");
    if (!isImageUrl(args[1]))
      return message.reply("Düzgün bir fotoğraf linki giriniz");
    message.channel.send("Başarılı şekilde kaydedildi");
    db.set(`karakter.kapak.${message.author.id}`, args[1]);
  } else if (args[0] == "alan") {
    if (!args.slice(1).join(" "))
      return message.reply("Lütefen bir meslek/alan giriniz");
    message.channel.send("Başarılı şekilde kaydedildi");
    db.set(`karakter.alan.${message.author.id}`, args.slice(1).join(" "));
  } else if (args[0] == "özellikler") {
    if (!args.slice(1).join(" "))
      return message.reply("Lütefen bir özellik giriniz");
    message.channel.send("Başarılı şekilde kaydedildi");
    db.set(`karakter.özellikler.${message.author.id}`, args.slice(1).join(" "));
  } else if (
    client.users.cache.get(args[0]) ||
    message.mentions.users.first()
  ) {
    let kişi =
      client.users.cache.get(args[0]) || message.mentions.users.first();
    let değerler = ["özellikler", "alan", "kapak", "fotoğraf", "isim"];
    let özellikler = db.get(`karakter.özellikler.${kişi.id}`);
    if (özellikler === undefined) özellikler = "Ayarlanmamış";
    let alan = db.get(`karakter.alan.${kişi.id}`);
    if (alan === undefined) alan = "Ayarlanmamış";
    let isim = db.get(`karakter.isim.${kişi.id}`);
    if (isim === undefined) isim = kişi.tag;
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`**${isim}** Profili`)
      .setDescription(`**Özellikler:**${özellikler}\n**Alan/Meslek:**${alan}`)
      .setImage(db.get(`karakter.fotoğraf.${kişi.id}`) || kişi.avatarURL())
      .setThumbnail(db.get(`karakter.kapak.${kişi.id}`) || kişi.avatarURL())
      .setFooter(
        `Karakter ayarlamak için değerler: ${değerler} örnek: !karakter isim Furtsy Hugo`
      );
    message.channel.send(embed);
  } else if (!args[0]) {
    let değerler = ["özellikler", "alan", "kapak", "fotoğraf", "isim"];
    let özellikler = db.get(`karakter.özellikler.${message.author.id}`);
    if (özellikler === undefined) özellikler = "Ayarlanmamış";
    let alan = db.get(`karakter.alan.${message.author.id}`);
    if (alan === undefined) alan = "Ayarlanmamış";
    let isim = db.get(`karakter.isim.${message.author.id}`);
    if (isim === undefined) isim = message.author.tag;
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Hoşgeldin **${isim}**`)
      .setDescription(`**Özellikler:**${özellikler}\n**Alan/Meslek:**${alan}`)
      .setImage(
        db.get(`karakter.fotoğraf.${message.author.id}`) ||
          message.author.avatarURL()
      )
      .setThumbnail(
        db.get(`karakter.kapak.${message.author.id}`) ||
          message.author.avatarURL()
      )
      .setFooter(
        `Karakter ayarlamak için değerler: ${değerler} örnek: !karakter isim Furtsy Hugo`
      );
    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["karakter"],
  permLevel: 0
};

exports.help = {
  name: "karakter",
  description: "karakter ayarları v.s",
  usage: "karakter"
};
