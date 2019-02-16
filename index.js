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
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Insufficient Permissions").then(r => r.delete(5000));
    }
    if (message.mentions.users.size === 0) {
      return message.reply("Please mention an user.").then(r => r.delete(5000));
    }
    let kickMemb = message.guild.member(message.mentions.users.first())
    let reason = args.slice(message.mentions.users.size).join(' ')
    if (!kickMemb) {
      return message.reply("Please mention a valid user.").then(r => r.delete(5000));
    }
    if (!reason) {
      return message.reply("Reason invalid.").then(r => r.delete(5000));
    }
    if (kickMemb.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Cannot kick this person!").then(r => r.delete(5000));
    }
    let sicon = message.guild.iconURL
    let kickEmbed = new Discord.RichEmbed()
      .setAuthor("TES Bot", bot.user.avatarURL)
      .setThumbnail(sicon)
      .setTitle(`DISCHARGE BY ` + message.author.username)
      .setDescription(`LOG`)
      .addField("Discharged Person:", kickMemb.user.username, true)
      .addField("Reason:", reason, true)
      .addField("Discharge Channel:", message.channel, true)
      .addField("Time:", message.createdAt, true)
      .setFooter("Prefix: ! | This bot is still in it's early phases | Go kill some HBC for me will ya?!", bot.user.avatarURL)
      .setTimestamp();

    kickMemb.kick().then(member => {
      message.reply(`${kickMemb} has been DD'ed for ${reason}!`)
      let channel = message.guild.channels.find(`name`, `discharge-logs`)
      channel.send(kickEmbed);
    })
  } else
  if (cmd === `addrole`) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Insufficient Permissions.").then(r => r.delete(5000))
    }
    if(message.mentions.users.size === 0){
      return message.reply("Please mention a user.").then(r => r.delete(5000))
    }
    let roleMember = message.guild.member(message.mentions.users.first())
    if(!roleMember){
      return message.reply("Invalid Member").then(r => r.delete(5000))
    }
    let role = args.slice(message.mentions.members.size).join(' ')
    if(!role){
      return message.reply('Please add a role.').then(r => r.delete(5000))
    }
    let realrole = message.guild.roles.find(`name`, role)
    if(!realrole){
      return message.reply("Please add a valid role").then(r => r.delete(5000))
    }
    if (roleMember.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Cannot role this person!").then(r => r.delete(5000));
    }
    let sicon = message.guild.iconURL
    let roleEmbed = new Discord.RichEmbed()
      .setAuthor("TES Bot", bot.user.avatarURL)
      .setThumbnail(sicon)
      .setTitle(`PROMOTION BY ` + message.author.username)
      .setDescription(`LOG`)
      .addField("Promoted Person:", roleMember.user.username, true)
      .addField("Role Added:", realrole.name, true)
      .addField("Promoted Channel:", message.channel, true)
      .addField("Time:", message.createdAt, true)
      .setFooter("Prefix: ! | This bot is still in it's early phases | Go kill some HBC for me will ya?!", bot.user.avatarURL)
      .setTimestamp();

    roleMember.addRole(realrole.id).then(messag => {
      message.reply(`${message.author.username} has promoted ${roleMember.user.username} to ${realrole.name}`)
      let channel = message.guild.channels.find(`name`, `promotion-logs`)
      channel.send(roleEmbed);
    })
  } else
  if (cmd === `removerole`) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Insufficient Permissions.").then(r => r.delete(5000))
    }
    if(message.mentions.users.size === 0){
      return message.reply("Please mention a user.").then(r => r.delete(5000))
    }
    let roleMember = message.guild.member(message.mentions.users.first())
    if(!roleMember){
      return message.reply("Invalid Member").then(r => r.delete(5000))
    }
    let role = args.slice(message.mentions.members.size).join(' ')
    if(!role){
      return message.reply('Please add a role.').then(r => r.delete(5000))
    }
    let realrole = message.guild.roles.find(`name`, role)
    if(!realrole){
      return message.reply("Please add a valid role").then(r => r.delete(5000))
    }
    if (roleMember.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Cannot role this person!").then(r => r.delete(5000));
    }
    let sicon = message.guild.iconURL
    let roleEmbed = new Discord.RichEmbed()
      .setAuthor("TES Bot", bot.user.avatarURL)
      .setThumbnail(sicon)
      .setTitle(`DEMOTION BY ` + message.author.username)
      .setDescription(`LOG`)
      .addField("Demoted Person:", roleMember.user.username, true)
      .addField("Role Removed:", realrole.name, true)
      .addField("Demotion Channel:", message.channel, true)
      .addField("Time:", message.createdAt, true)
      .setFooter("Prefix: ! | This bot is still in it's early phases | Go kill some HBC for me will ya?!", bot.user.avatarURL)
      .setTimestamp();

    roleMember.removeRole(realrole.id).then(messag => {
      message.reply(`${message.author.username} has demoted ${roleMember.user.username} to ${realrole.name}`)
      let channel = message.guild.channels.find(`name`, `demotion-logs`)
      channel.send(roleEmbed);
    })
  } else
  if (cmd === `nickname`) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Insufficient Permissions.").then(r => r.delete(5000))
    }
    if(message.mentions.users.size === 0){
      return message.reply("Please mention a user.").then(r => r.delete(5000))
    }
    let roleMember = message.guild.member(message.mentions.users.first())
    if(!roleMember){
      return message.reply("Invalid Member").then(r => r.delete(5000))
    }
    let role = args.slice(message.mentions.members.size).join(' ')
    if(!role){
      return message.reply('Please add a nickname.').then(r => r.delete(5000))
    }
    if (roleMember.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Cannot nickname this person!").then(r => r.delete(5000));
    }
    roleMember.setNickname(role).then(messag => {
      return message.reply(`${message.author.username} has changed ${roleMember.user.username}'s nickname to ${role}`)
    })
  }
});

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

bot.login(process.env.token);
