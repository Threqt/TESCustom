const botconfig = require("./botconfig")
const Discord = require("discord.js");

const bot = new Discord.Client({disableEverybody: true})

bot.on(`guildMemberAdd`, member => {
  console.log(`User ` + member.user.username + ` has joined`)
  var role = member.guild.roles.find('name', 'Reader')
  member.addRole(role)
});

bot.on("ready", async() => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("reading TES");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}ping`){
    return message.channel.send("pong");
  }

  if(cmd === `${prefix}botinfo`){
    const embed = new Discord.RichEmbed()
               .setAuthor(`TES Bot`, bot.user.avatarURL)
               .setThumbnail(bot.user.avatarURL)
               .addField(`Bot Name`, `TES Bot`, true)
               .addField(`Created On`, bot.user.createdAt)
               .addField(`Version`, `1.0.0`, true)
               .addField(`Developer`, `Threqt#3799`, true)
               .setFooter("Prefix: ! | This bot is still in it's early phases | Go check out the latest newspaper too!", bot.user.avatarURL)
               .setTimestamp()
               .setColor(000000);

    return message.channel.send(embed)
  }
});



bot.login(botconfig.token);
