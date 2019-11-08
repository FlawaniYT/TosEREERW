const Discord = module.require("discord.js");


module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("nie znaleziono użytkownika.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reporty")
    .setColor("#00ffff")
    .addField("Zgłoszony Użytkownik", `${rUser} ID: ${rUser.id}`)
    .addField("Zgłoszony Przez", `${message.author} ID: ${message.author.id}`)
    .addField("Kanał", message.channel)
    .addField("Powód", reason)
    .addField("Czas", message.createdAt);


    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Chmura nie znalazła kanału z reportami.");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
}

module.exports.help = {
    name: "report"
}