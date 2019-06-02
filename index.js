const config = require("./botconfig")
const Discord = require("discord.js");
const profanaties = ["NIGGER", "NIGGA", "CUNT", "FUCK", "BITCH", "CNUT", "NIBBA", "NIBBER"]
const bot = new Discord.Client({
  disableEverybody: true
})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Forsaken come to life", {
    type: "WATCHING"
  });
});

bot.on(`guildMemberAdd`, async member => {
  let welcome = await bot.channels.find(channel => channel.id === 582372727478812693)
  welcome.send(`User ` + member.user.username + ` has joined Forsaken`)
  message.channel.send()
  console.log(`User ` + member.user.username + ` has joined`)
  var role = member.guild.roles.find('name', 'Community Member')
  member.addRole(role).catch(console.err)
});

bot.on("message", message => {

  for (i = 0; i < profanaties.length; i++) {
    if (message.content.toUpperCase() == profanaties[i].toUpperCase()) {
      message.reply("Don\'t say that!").then(r => r.delete(5000))
      message.delete()
      return;
    }
  }

  if (message.author.bot) return;
  // This is where we'll put our code.
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();


  if (cmd === `ping`) {
    return message.channel.send("pong");
  } else
  if (cmd === `botinfo`) {
    const embed = new Discord.RichEmbed()
      .setAuthor(`Forsaken Bot`, bot.user.avatarURL)
      .setThumbnail(bot.user.avatarURL)
      .addField(`Bot Name`, `Forsaken Bot`, true)
      .addField(`Created On`, bot.user.createdAt)
      .addField(`Version`, `1.0.0`, true)
      .addField(`Developer`, `Threqt#4377`, true)
      .setFooter("Prefix: ! | This bot is still in it's early phases", bot.user.avatarURL)
      .setTimestamp()
      .setColor(000000);

    return message.channel.send(embed)
  } else
  if (cmd === `serverinfo`) {
    let sicon = message.guild.iconURL
    let online = message.guild.members.filter(m => m.presence.status !== 'offline').size
    let categories = message.guild.channels.filter(m => m.type === 'category').size
    let embed2 = new Discord.RichEmbed()
      .setAuthor("Forsaken Bot", bot.user.avatarURL)
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
      .setFooter("Prefix: ! | This bot is still in it's early phases", bot.user.avatarURL)
      .setTimestamp();

    return message.channel.send(embed2)
  }
});

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

bot.login(process.env.token);
