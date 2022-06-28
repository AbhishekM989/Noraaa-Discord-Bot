const { Client, Message, MessageEmbed } = require("discord.js");
const { Role: { comparePositions } } = require('discord.js');

module.exports = {
    name: "kick",
    category: 'Moderation',
    description: 'Kicks The Member',
    userPermissions: ['KICK_MEMBERS'],
    botPermissions: ['KICK_MEMBERS'],

    run: async (client, message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('**<:wrong:895367205875769354> Please Mention A User To Kick **')

        if (comparePositions(message.guild.me.roles.highest, member.roles.highest) <= 0) {
            return message.reply(`**<:wrong:895367205875769354> The User Role Is Higher Than Me So I Can't Kick**`);
        }

        const reason = args.slice(1).join(" ") || "No Reason Provided"
        member.kick( {reason} )

        client.modlogs({
            Member: member,
            Action: "KICK",
            Color: "RED",
            Reason: reason
          }, message);
        message.channel.send(`<:right:895367206160961577> **Kicked ${member} For \`${reason}\`**`)
    }
}    