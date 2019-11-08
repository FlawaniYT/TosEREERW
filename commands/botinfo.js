const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Info o bociku")
    .setColor("#00ffff")
    .setThumbnail(bicon)
    .addField("Nazwa bota", bot.user.username)
    .addField("Stworzony w", bot.user.createdAt);

     message.channel.send("Wiadomość wysłana na PV!");
     return message.author.send(botembed);
    
}

module.exports.help = {
    name: "botinfo"
}