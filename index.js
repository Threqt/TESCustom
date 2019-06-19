const config = require("./botconfig")
const Discord = require("discord.js");
const bot = new Discord.Client({
  disableEverybody: true
})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("to sirens", {
    type: "LISTENING"
  });
});

bot.on(`guildMemberAdd`, async member => {
  console.log(`User ` + member.user.username + ` has joined`)
  var role = member.guild.roles.find('name', 'Blind')
  member.addRole(role).catch(console.err)
});

bot.on("message", async message => {

  if (message.author.bot) return;


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  // This is where we'll put our code.
  if (message.content.indexOf(config.prefix) !== 0) return;

  if (cmd === `ping`) {
    let msg = await message.channel.send("Testing ping...")
    msg.edit(`Pong! Latency is ${msg.createdAt - message.createdAt}ms. API Latency is ${bot.ping}ms.`)
  } else
  if (cmd === 'remove') {

  }
});

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

bot.login(process.env.token);
