const { Client, Message, MessageEmbed } = require("discord.js");
const { Role: { comparePositions } } = require('discord.js');

module.exports = {
    name: "unban",
    category: 'Moderation',
    description: 'Unans The Member',
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],

    run: async (client, message, args) => {

        const id = args[0]
        if(!id) return message.reply('**<:wrong:895367205875769354> Please Mention A User By His ID !**')

        const bannedMembers = await message.guild.fetchBans()
        if(!bannedMembers.find((user) => user.user.id === id)) 
           return message.channel.send("** User Is Not Banned **")

        message.guild.members.unban(id);
        message.channel.send('**<:right:895367206160961577> Unbanned User **')
    }
}