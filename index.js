const config = require("./botconfig")
const Discord = require("discord.js");

const bot = new Discord.Client({disableEverybody: true}

bot.on(`guildMemberAdd`, member => {
  console.log(`User ` + member.user.username + ` has joined`)
  var role = member.guild.roles.find('name', 'Reader')
  member.addRole(role)
});

bot.on("ready", async() => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Akame's sick covers", {type: "LISTENING"});
});

bot.on("message", message => {
  if (message.author.bot) return;
  // This is where we'll put our code.
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if(cmd === `ping`){
    return message.channel.send("pong");
  } else
  if(cmd === `botinfo`){
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
  } else
  if(cmd === `serverinfo`){
    let sicon = message.guild.iconURL
    let online = message.guild.members.filter(m => m.presence.status !== 'offline').size
    let categories = message.guild.channels.filter(m => m.type === 'category').size
    let embed2 = new Discord.RichEmbed()
    .setAuthor("TES Bot", bot.user.avatarURL)
    .setThumbnail(sicon)
    .addField("Owner", message.guild.owner, true)
    .addField("Created", message.guild.createdAt, true)
    .addField("Join Date", message.guild.joinedAt, true)
    .addField("Roles", message.guild.roles.size, true)
    .addField("Channels", message.guild.channels.size, true)
    .addField("Categories", categories, true)
    .addField("Region", message.guild.region, true)
    .addField("Total Members", message.guild.memberCount, true)
    .addField("Online Members", online, true)
     .setFooter("Prefix: ! | This bot is still in it's early phases | Go check out the latest newspaper too!", bot.user.avatarURL);

    return message.channel.send(embed2)
  }
});



bot.login(process.env.token);
