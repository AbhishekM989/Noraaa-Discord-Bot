const { Client, Message, MessageEmbed } = require("discord.js");
const { Role: { comparePositions } } = require('discord.js');

module.exports = {
    name: "ban",
    category: 'Moderation',
    description: 'Bans The Member',
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],

    run: async (client, message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('**<:wrong:895367205875769354> Please Mention A User To Ban **')

        if (comparePositions(message.guild.me.roles.highest, member.roles.highest) <= 0) {
            return message.reply(`**<:wrong:895367205875769354> The User Role Is Higher Than Me So I Can't Ban**`);
        }

        const reason = args.slice(1).join(" ") || "No Reason Provided"
        member.ban({ reason })


        client.modlogs({
            Member: member,
            Action: "BAN",
            Color: "RED",
            Reason: reason
          }, message);

        message.channel.send(`<:right:895367206160961577> **Banned ${member} For \`${reason}\`**`)
    }
}  