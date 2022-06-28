const client = require('../index')
const config = require('../config.json')
const { badwords } = require('../data.json')
const prefix = config.prefix
const token = config.token
const premiumSchema = require('../commands/modals/premium')
const mongoDBURL = require('.././config.json').mongoDBURL
const Levels = require('discord-xp')
Levels.setURL(mongoDBURL)


client.on('message', async message =>{
    if(!message.guild)
    if(message.author.bot) return;


    if(!message.member.permissions.has("ADMINISTRATOR")) {
      let confirm = false;

      var i;
      for(i = 0;i < badwords.length; i++) {
        if(message.content.toLocaleLowerCase().includes(badwords[i].toLowerCase()))
          confirm = true
      }

      if(confirm) {
        message.delete()
        return message.reply("**<:wrong:895367205875769354> Watch Your Language**").then(msg => {
          msg.delete({ timeout: 5000})
        })
      }
    }

    

    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command.premium && !(await premiumSchema.findOne({ User: message.author.id})))
      return message.reply('**<:wrong:895367205875769354> You Need To Upgrade To Premium To Use This Command !**')

    if(command.ownerOnly) {
      if(!client.config.OwnerId.includes(message.author.id)) {
        return message.channel.send(`**${message.member}<:wrong:895367205875769354> You Can't Access Owner Commands !**`)
      }
    }

    if(!message.member.permissions.has(command.userPermissions || [])) return message.channel.send(`**<:wrong:895367205875769354> You Are Missing \`${command.userPermissions}\` Permission !**`);
    if(!message.guild.me.permissions.has(command.botPermissions || [])) return message.channel.send(`**<:wrong:895367205875769354> I Am Missing \`${command.botPermissions}\` Permission !**`);
  
    if(command) command.run(client, message, args) 


    const randomAmountOfXp = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.channel.send(`${message.author} Congratulations You Just Levelled Up To  **${user.level}**. Keep Going ! `);
    }

    
})

