const {Client, Message, MessageEmbed} = require('discord.js');

module.exports ={
    name: 'dm',
    Category: "Moderation",
    description: 'Sends A Dm To A User',
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],

    run: async(client, message, args) => {
        
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user

        const str = args.slice(1).join(" ")

        if(message.content.includes('-a')){
            user.send(str.replace("-a", ""))
        } else {
            user.send(`${message.author.tag}: ${str}`)
        }
    }
}