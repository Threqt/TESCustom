const config = require("./botconfig")
const Discord = require("discord.js");
let journstatus = true
let journastatus = true
let bountyhstatus = true
let bountyrstatus = true
let merchantapp = true

const bot = new Discord.Client({
  disableEverybody: true
})

bot.on(`guildMemberAdd`, member => {
  console.log(`User ` + member.user.username + ` has joined`)
  var role = member.guild.roles.find('name', 'Reader')
  member.addRole(role)
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Akame's sick covers", {
    type: "LISTENING"
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
          .setFooter("Prefix: ! | This bot is still in it's early phases | Go check out the latest newspaper too!", bot.user.avatarURL)
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
          .setFooter("Prefix: ! | This bot is still in it's early phases | Go check out the latest newspaper too!", bot.user.avatarURL)
          .setTimestamp();

        return message.channel.send(embed2)
      } else
      if (cmd === `cmds`) {
        return message.author.send("```css\n[TES BOT] \n{Creator:} .Threqt\n\n [COMMAND PREFIX:] ! \n\n [COMMANDS:] \n {►!ping: 'Returns pong, test message.'} \n {►!botinfo: | 'Returns info about the bot.'} \n {►!serverinfo: | 'Returns info about the server'} \n {►!journeymenapp: | 'Messages the user a link to the journeymen applications when the are open.'} \n {►!journalistapp: | 'Messages the user a link to the journalist applications when the are open.'} \n {►!giveaway: | 'Gives the user the giveaway role if the user does not have it, removes it if the user does.'}\n {►!bountyreporterapp: | 'Messages the user a link to the Bounty Reporter applicatons when they are open.'}\n {►!bountyhunterapp: | 'Messages the user a link to the bounty hunter applications when they are open.'}}```")
      } else
      if (cmd === `journalistapp`) {
        if (journastatus === true) {
          const user = message.member.id
          message.channel.send(`<@${user}>, check your DMs for the application!`)
          return message.author.send("The Journalist Application can be found here. Good luck! https://docs.google.com/forms/d/e/1FAIpQLSeOxjBPxgr-yGRlUdlITXX33RzGIKrcSuhCvKZ6jW63__40_A/viewform")
        } else {
          return message.channel.send("Applications are currently closed, sorry!")
        }
      } else
      if (cmd === `journeymenapp`) {
        if (journstatus === true) {
          const user = message.member.id
          message.channel.send(`<@${user}>, check your DMs for the application!`)
          return message.author.send("The Journeymen Application can be found here. Good luck! https://docs.google.com/forms/d/e/1FAIpQLSdq57DGEF9iZ7V6cLSypDAd64KI0dLv1aRHvER0rURib2YKFw/viewform")
        } else {
          return message.channel.send("Applications are currently closed, sorry.")
        }
      } else
      if (cmd === `bountyreporterapp`) {
        if (bountyrstatus === true) {
          const user = message.member.id
          message.channel.send(`<@${user}>, check your DMs for the application!`)
          message.author.send("The Bounty Reporter Application can be found here. Good luck! https://docs.google.com/forms/d/e/1FAIpQLSfqaNe-2IzHpRH3nwPfALOPyrMejLyoAIqPBhkQ8PebhnDMpQ/viewform")
        } else {
          return message.channel.send("Applications are currently closed, sorry!")
        }
      } else
      if (cmd === `bountyhunterapp`) {
        if (bountyhstatus === true) {
          const user = message.member.id
          message.channel.send(`<@${user}>, check your DMs for the application!`)
          return message.author.send("The Bounty Hunter Application can be found here. Good luck! https://docs.google.com/forms/d/e/1FAIpQLScs-wSxQWWXCk180t2BO2mOoEdVvdwtm_xalDr0iozrB8sFDQ/viewform")
        } else {
          return message.channel.send("Applications are currently closed, sorry!")
        }
      } else
      if (cmd === "merchantapp") {
        if (merchantapp === true) {
          const user = message.member.id
          message.channel.send(`<@${user}>, check your DMs for the application!`)
          return message.author.send("The Merchant Application can be found here. Good luck! https://docs.google.com/forms/d/e/1FAIpQLSfQtoLHxgjBFXmIlc5fxbW-ykd2Ubddc4Nf60lMfQkpWge2Rw/viewform?usp=sf_link")
        } else {
          return message.channel.send("Applications are currently closed, sorry!")
        }
      } else
      if (cmd === `togglejourneymen`) {
        let admin = message.guild.roles.find(r => r.name === "Adminstrator")
        let mod = message.guild.roles.find(r => r.name === "Moderator")
        if (message.member.roles.has(admin.id) || message.member.roles.has(mod.id)) {
          journstatus = journstatus ? false : true;
          console.log(journstatus)
          return message.channel.send("Toggled journeymen appliciation status to " + journstatus + ".")
        } else {
          return message.channel.send("Insufficient Permissions")
        }
      } else
      if (cmd === `togglejournalist`) {
        let admin = message.guild.roles.find(r => r.name === "Adminstrator")
        let mod = message.guild.roles.find(r => r.name === "Moderator")
        if (message.member.roles.has(admin.id) || message.member.roles.has(mod.id)) {
          journastatus = journastatus ? false : true;
          console.log(journastatus)
          return message.channel.send("Toggled journalist appliciation status to " + journastatus + ".")
        } else {
          return message.channel.send("Insufficient Permissions")
        }
      } else if (cmd === `togglebountyreporter`) {
        let admin = message.guild.roles.find(r => r.name === "Adminstrator")
        let mod = message.guild.roles.find(r => r.name === "Moderator")
        if (message.member.roles.has(admin.id) || message.member.roles.has(mod.id)) {
          bountyrstatus = bountyrstatus ? false : true;
          console.log(bountyrstatus)
          return message.channel.send("Toggled Bounty Reporter appliciation status to " + bountyrstatus + ".")
        } else {
          return message.channel.send("Insufficient Permissions")
        }
      } else if (cmd === `togglebountyhunter`) {
        let admin = message.guild.roles.find(r => r.name === "Adminstrator")
        let mod = message.guild.roles.find(r => r.name === "Moderator")
        if (message.member.roles.has(admin.id) || message.member.roles.has(mod.id)) {
          bountyhstatus = bountyhstatus ? false : true;
          console.log(bountyhstatus)
          return message.channel.send("Toggled Bounty Hunter appliciation status to " + bountyhstatus + ".")
        } else {
          return message.channel.send("Insufficient Permissions")
        }
      } else
      if (cmd === `togglemerchant`) {
        let admin = message.guild.roles.find(r => r.name === "Adminstrator")
        let mod = message.guild.roles.find(r => r.name === "Moderator")
        if (message.member.roles.has(admin.id) || message.member.roles.has(mod.id)) {
          merchantapp = merchantapp ? false : true;
          console.log(merchantapp)
          return message.channel.send("Toggled merchant appliciation status to " + merchantapp + ".")
        } else {
          return message.channel.send("Insufficient Permissions")
        }
      }
      if (cmd === `message`) {
        let msg = message.content.toLowerCase()
        let members = message.mentions.members.array()
        let context = args.slice(message.mentions.members.size).join(' ')
        let noBots = true
        if (members == null) return message.channel.send("Invalid Arguments");
        for (let i = 0; i < members.length; i++) {
          let user = members[i]
          if (user.user.bot === true) {
            message.channel.send("One of the users specified is a bot, please redo.")
            noBots = false;
            break;
          }
        }
        noBots ? message.mentions.members.forEach(m => m.send(context)) : message.channel.send(" ")
      } else
      if (cmd === `role`) {
        const myRole = message.guild.roles.find(role => role.name === "Faction Leader")
        const myRole1 = message.guild.roles.find(role => role.name === "Faction Officer")
        const myRole2 = message.guild.roles.find(role => role.name === "Hudson Bay Company")
        const myRole3 = message.guild.roles.find(role => role.name === "Giveaway")
        let context = args.join(' ')
        context = context.toLowerCase()
        console.log(context)

        function switcher(role) {
          switch (message.member.roles.has(role.id)) {
            case false:
              message.member.addRole(role.id)
              message.channel.send(`Successfully added ${role.name}!`)
              break;
            case true:
              message.member.removeRole(role.id)
              message.channel.send(`Successfully removed ${role.name}!`)
              break;
          }
        }
        let contexts = ["faction leader", "faction officer", "hbc", "giveaway"]
        let roles = ["faction leader", myRole, "faction officer", myRole1, "hbc", myRole2, "giveaway", myRole3]
        if (context) {
          console.log("yes")
          for (var i = 0; i < contexts.length; i++) {
            let contextvalue = contexts[i]
            if (context === contextvalue) {
              console.log('success')
              for (var o = 0; o < roles.length; o++) {
                let role = roles[o]
                if (context === role) {
                  let role1 = roles[o + 1]
                  switcher(role1)
                  break;
                }
              }
            }
          }
        }
      }
      });

    bot.on("error", (e) => console.error(e)); bot.on("warn", (e) => console.warn(e)); bot.on("debug", (e) => console.info(e));

    bot.login(process.env.token);
