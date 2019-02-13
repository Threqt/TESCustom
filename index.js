const config = require("./botconfig")
const Discord = require("discord.js");

const bot = new Discord.Client({
  disableEverybody: true
})

bot.on(`guildMemberAdd`, member => {
  console.log(`User ` + member.user.username + ` has left HBC and join HGC`)
  var role = member.guild.roles.find('name', 'Selection Process')
  member.addRole(role)
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("HGC sicko mode HBC", {
    type: "WATCHING"
  });
});

bot.on("message", message => {
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
      .setAuthor(`TES Bot`, bot.user.avatarURL)
      .setThumbnail(bot.user.avatarURL)
      .addField(`Bot Name`, `TES Bot`, true)
      .addField(`Created On`, bot.user.createdAt)
      .addField(`Version`, `1.0.0`, true)
      .addField(`Developer`, `Threqt#3799`, true)
      .setFooter("Prefix: ! | This bot is still in it's early phases | Go clap some HBC for me will ya?!", bot.user.avatarURL)
      .setTimestamp()
      .setColor(000000);

    return message.channel.send(embed)
  } else
  if (cmd === `serverinfo`) {
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
      .setFooter("Prefix: ! | This bot is still in it's early phases | Go kill some HBC for me will ya?!", bot.user.avatarURL)
      .setTimestamp();

    return message.channel.send(embed2)
  } else
  if (cmd === `discharge`) {
    let hr = message.guild.roles.find("name", "0GR Command")
    let hr1 = message.guild.roles.find("name", "7GR Command")
    let hr2 = message.guild.roles.find("name", "69GR Command")
    let hr3 = message.guild.roles.find("name", "6GR Command")
    let hr4 = message.guild.roles.find("name", "Anal Command")
    let hr5 = message.guild.roles.find("name", "Jew Command")
    if(!message.member.roles.has(hr.id || hr1.id || hr2.id || hr3.id || hr4.id || hr5.id)){
      return message.reply("Insufficient Permissions.").catch(console.error)
    }
    if(message.mentions.users.size === 0){
      return message.reply("Please mention an user.").catch(console.error)
    }
    let kickMemb = message.guild.member(message.mentions.users.first())
    let reason = args.slice(message.mentions.users.size).join(' ')
    if(!kickMemb){
      return message.reply("Please mention a valid user.").catch(console.error)
    }
    kickMemb.kick().then(member => {
      return message.reply(`${kickMemb} has been DD'ed for ${reason}!`).catch(console.error)
    })
  }
});

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

bot.login(process.env.token);
