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
  if (cmd === `promote`) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Insufficient Permissions.").then(r => r.delete(5000))
    }
    let str = message.content.indexOf(".")
    if (str === -1) {
      return message.reply("Invalid First Argument.").then(r => r.delete(5000))
    }
    let str1 = message.content.slice(8, str)
    if (str1.search("<@") === -1) {
      return message.reply("Please mention a user.").then(r => r.delete(5000))
    }
    let str2 = message.content.slice(str + 1, message.length)
    let str3 = str2.indexOf(".")
    if (str3 === -1) {
      return message.reply("Invalid Second Argument.").then(r => r.delete(5000))
    }
    let str4 = str2.slice(0, str3)
    let str5 = str2.slice(str3 + 1, str2.length)
    let str6 = str5.indexOf(".")
    if (str6 === -1) {
      return message.reply("Invalid Third Argument.").then(r => r.delete(5000))
    }
    let str7 = str5.slice(0, str6)
    let str8 = str5.slice(str6 + 1, str5.length)
    if (str8.length === 0) {
      return message.reply("Invalid Fifth Argument.").then(r => r.delete(5000))
    }
    console.log(str1)

    if (message.mentions.users.size === 0) {
      return message.reply("Please mention an user.").then(r => r.delete(5000));
    }
    let roleMemb = message.guild.member(message.mentions.users.first())
    if (!roleMemb) {
      return message.reply("Please mention a valid user.").then(r => r.delete(5000))
    }
    if (roleMemb.user.username === message.author.username) {
      return message.reply("Please do not mention yourself.").then(r => r.delete(5000))
    }
    let oldrole = message.guild.roles.find('name', str4)
    if (!oldrole) {
      return message.reply("Please mention a valid role.").then(r => r.delete(5000))
    }
    let newrole = message.guild.roles.find('name', str7)
    if (!newrole) {
      return message.reply("Please mention a valid role.").then(r => r.delete(5000))
    }
    if (newrole.position >= message.member.highestRole.position) {
      return message.reply("This role is too high to be added.").then(r => r.delete(5000))
    }
    if (newrole.position < oldrole.position) {
      return message.reply("This is for adding, not removing roles.").then(r => r.delete(5000))
    }
    if (roleMemb.roles.has(newrole.id)) {
      return message.reply("User already has this role.").then(r => r.delete(5000))
    }
    if (!roleMemb.roles.has(oldrole.id)) {
      return message.reply("User doesen't have old role.").then(r => r.delete(5000))
    }
    if (roleMemb.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("You do not have permission to add roles to this user.").then(r => r.delete(5000))
    }
    let sicon = message.guild.iconURL
    let roleEmbed = new Discord.RichEmbed()
      .setAuthor("TES Bot", bot.user.avatarURL)
      .setThumbnail(sicon)
      .setTitle(`PROMOTION BY ` + message.author.username)
      .setDescription(`LOG`)
      .addField("Promoted Person:", roleMemb.user.username, true)
      .addField("Old Role:", oldrole.name, true)
      .addField("New Role:", newrole.name, true)
      .addField("Reason:", str8, true)
      .addField("Promoted Channel:", message.channel, true)
      .addField("Time:", message.createdAt, true)
      .setFooter("Prefix: ! | This bot is still in it's early phases | Go kill some HBC for me will ya?!", bot.user.avatarURL)
      .setTimestamp();

    roleMemb.addRole(newrole.id).then(messag => {
      message.reply(`${message.author.username} has promoted ${roleMemb.user.username} from ${oldrole.name} to ${newrole.name} because ${str8}`)
      let channel = message.guild.channels.find(`name`, `promotion-logs`)
      channel.send(roleEmbed);
    })
    roleMemb.removeRole(oldrole.id)
  } else
  if (cmd === `demote`) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Insufficient Permissions.").then(r => r.delete(5000))
    }
    let str = message.content.indexOf(".")
    if (str === -1) {
      return message.reply("Invalid First Argument.").then(r => r.delete(5000))
    }
    let str1 = message.content.slice(8, str)
    if (str1.search("<@") === -1) {
      return message.reply("Please mention a user.").then(r => r.delete(5000))
    }
    let str2 = message.content.slice(str + 1, message.length)
    let str3 = str2.indexOf(".")
    if (str3 === -1) {
      return message.reply("Invalid Second Argument.").then(r => r.delete(5000))
    }
    let str4 = str2.slice(0, str3)
    let str5 = str2.slice(str3 + 1, str2.length)
    let str6 = str5.indexOf(".")
    if (str6 === -1) {
      return message.reply("Invalid Third Argument.").then(r => r.delete(5000))
    }
    let str7 = str5.slice(0, str6)
    let str8 = str5.slice(str6 + 1, str5.length)
    if (str8.length === 0) {
      return message.reply("Invalid Fifth Argument.").then(r => r.delete(5000))
    }
    console.log(str1)

    if (message.mentions.users.size === 0) {
      return message.reply("Please mention an user.").then(r => r.delete(5000));
    }
    let roleMemb = message.guild.member(message.mentions.users.first())
    if (!roleMemb) {
      return message.reply("Please mention a valid user.").then(r => r.delete(5000))
    }
    if (roleMemb.user.username === message.author.username) {
      return message.reply("Please do not mention yourself.").then(r => r.delete(5000))
    }
    let oldrole = message.guild.roles.find('name', str4)
    if (!oldrole) {
      return message.reply("Please mention a valid role.").then(r => r.delete(5000))
    }
    let newrole = message.guild.roles.find('name', str7)
    if (!newrole) {
      return message.reply("Please mention a valid role.").then(r => r.delete(5000))
    }
    if (newrole.position > oldrole.position) {
      return message.reply("This is for removing, not adding roles.").then(r => r.delete(5000))
    }
    if (roleMemb.roles.has(newrole.id)) {
      return message.reply("User already has this role.")
    }
    if (!roleMemb.roles.has(oldrole.id)) {
      return message.reply("User doesen't have old role.")
    }
    let sicon = message.guild.iconURL
    let roleEmbed = new Discord.RichEmbed()
      .setAuthor("TES Bot", bot.user.avatarURL)
      .setThumbnail(sicon)
      .setTitle(`DEMOTION BY ` + message.author.username)
      .setDescription(`LOG`)
      .addField("Demoted Person:", roleMemb.user.username, true)
      .addField("Old Role:", oldrole.name, true)
      .addField("New Role:", newrole.name, true)
      .addField("Reason:", str8, true)
      .addField("Demoted Channel:", message.channel, true)
      .addField("Time:", message.createdAt, true)
      .setFooter("Prefix: ! | This bot is still in it's early phases | Go kill some HBC for me will ya?!", bot.user.avatarURL)
      .setTimestamp();

    roleMemb.addRole(newrole.id).then(messag => {
      message.reply(`${message.author.username} has demoted ${roleMemb.user.username} from ${oldrole.name} to ${newrole.name} because ${str8}`)
      let channel = message.guild.channels.find(`name`, `demotion-logs`)
      channel.send(roleEmbed);
    })
    roleMemb.removeRole(oldrole.id)
  }
});

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

bot.login(process.env.token);
