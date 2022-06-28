const { Client, Message, MessageEmbed } = require("discord.js");
const { Role: { comparePositions } } = require('discord.js');

module.exports = {
  name: "nick",
  category: 'Moderation',
  description: 'Change The Nick Name Of The Member',
  userPermissions: ['MANAGE_NICKNAMES'],
  botPermissions: ['MANAGE_NICKNAMES'],
 
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

        args.shift()
        const nickname = args.join(' ')
        if(!member) return message.channel.send('**<:wrong:895367205875769354> Please Mention A User**')

        if (comparePositions(message.guild.me.roles.highest, member.roles.highest) <= 0) {
          return message.channel.send(`**<:wrong:895367205875769354> The User Role Is Higher Than Me So I Can't Change The Nickname**`);
      }

      client.modlogs({
        Member: member,
        Action: "Nickname Changed",
        Color: "RED",
      }, message);

      member.setNickname(nickname || null).then(mem => {
            message.channel.send(mem.nickname ? ` <:right:895367206160961577> Set nickname to **${mem.nickname}**` : `<:right:895367206160961577> Set back to username **${mem.user.username}**`);
        })
  },
};