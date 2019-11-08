const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("Miłego dnia", {type: "WATCHING"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);


    // if(cmd === `${prefix}kick`){


    //     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //     if(!kUser) return message.channel.send("Nie znaleziono użytkownika!");
    //     let kReasone = args.join(" ").slice(22);
    //     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("nie da rady!");
    //     if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tej osoby nie można wyrzucić");


    //     let kickEmbed = new Discord.RichEmbed()
    //     .setDescription("~Kick~")
    //     .setColor("#e56b00")
    //     .addField("Wyrzucony Użytkownik", `${kUser} ID ${kUser.id}`)
    //     .addField("Wyrzucony Przez", `<@${message.author.id}> ID ${message.author.id}`)
    //     .addField("Wyrzucony z kanału", message.channel)
    //     .addField("Tiime", message.createdAt)
    //     .addField("Powód", kReasone);

    //     let kickChannel = message.guild.channels.find(`name`, "incydenty");
    //     if(!kickChannel) return message.channel.send("Chmura nie znalazła kanału z incydentami.");

    //     message.guild.member(kUser).kick(kReasone);
    //     kickChannel.send(kickEmbed);



    //     return;
    // }

    // if(cmd === `${prefix}ban`){

    //     let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //     if(!bUser) return message.channel.send("Nie znaleziono użytkownika!");
    //     let bReasone = args.join(" ").slice(22);
    //     if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("nie da rady!");
    //     if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tej osoby nie można zbanować!");


    //     let banEmbed = new Discord.RichEmbed()
    //     .setDescription("~Ban~")
    //     .setColor("#bc0000")
    //     .addField("Zbanowany Użytkownik", `${bUser} ID ${bUser.id}`)
    //     .addField("Zbanowany Przez", `<@${message.author.id}> ID ${message.author.id}`)
    //     .addField("Zbanowany z kanału", message.channel)
    //     .addField("Time", message.createdAt)
    //     .addField("Powód", bReasone);

    //     let incidentchannel = message.guild.channels.find(`name`, "incydenty");
    //     if(!incidentchannel) return message.channel.send("Chmura nie znalazła kanału z incydentami.");

    //     message.guild.member(bUser).ban(bReasone);
    //     incidentchannel.send(banEmbed);


    //     return;
    // }


    // if(cmd === `${prefix}report`){


    //     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //     if(!rUser) return message.channel.send("nie znaleziono użytkownika.");
    //     let reason = args.join(" ").slice(22);

    //     let reportEmbed = new Discord.RichEmbed()
    //     .setDescription("Reporty")
    //     .setColor("#00ffff")
    //     .addField("Zgłoszony Użytkownik", `${rUser} ID: ${rUser.id}`)
    //     .addField("Zgłoszony Przez", `${message.author} ID: ${message.author.id}`)
    //     .addField("Kanał", message.channel)
    //     .addField("Powód", reason)
    //     .addField("Czas", message.createdAt);


    //     let reportschannel = message.guild.channels.find(`name`, "reports");
    //     if(!reportschannel) return message.channel.send("Chmura nie znalazła kanału z reportami.");

    //     message.delete().catch(O_o=>{});
    //     reportschannel.send(reportEmbed);

    //     return;
    // }

    // if(cmd === `${prefix}serverinfo`){
    //     let sicon = message.guild.iconURL;
    //     let serverembed = new Discord.RichEmbed()
    //     .setDescription("**\\Server Info/**")
    //     .setFooter("Koniec Informacji")
    //     .setColor("#00ffff")
    //     .setThumbnail(sicon)
    //     .addField("Nazwa Serwera", message.guild.name)
    //     .addField("Prefix", '"!"')
    //     .addField("Wszyscy członkowie", message.guild.memberCount)
    //     .addField("Stworzony w", message.guild.createdAt)
    //     .addField("Dołączyłeś/aś", message.member.joinedAt);

    //     message.channel.send("Wiadomość wysłana na PV!");
    //     return message.author.send(serverembed);
    // }

    // if(cmd === `${prefix}botinfo`){

    //     let bicon = bot.user.displayAvatarURL;
    //     let botembed = new Discord.RichEmbed()
    //     .setDescription("Info o bociku")
    //     .setColor("#00ffff")
    //     .setThumbnail(bicon)
    //     .addField("Nazwa bota", bot.user.username)
    //     .addField("Stworzony w", bot.user.createdAt);

    //     message.channel.send("Wiadomość wysłana na PV!");
    //     return message.author.send(botembed);
    // }

});

bot.login(tokenfile.token);