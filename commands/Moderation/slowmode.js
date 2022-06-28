const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require('ms')

module.exports = {
    name: "slowmode",
    aliases: ['sm'],
    category: 'Moderation',
    description: 'Sets The Slowmode For The Channel',
    userPermissions: ['MANAGE_CHANNELS'],
    botPermissions: ['MANAGE_CHANNELS'],

    run: async(client, message, args) => {

        if(!args [0]) {
            message.channel.setRateLimitPerUser(0);
            message.channel.send('**<:right:895367206160961577> Slowmode Has Been Turned Off**'); return;
        }

        const rawTime = args[0]
        const millisecond = ms(rawTime)

        if(isNaN(millisecond)) return message.channel.send('**Time Is Not A Number**')
        if(millisecond < 1000) return message.channel.send('**Minimum Time Is 1 Second**')

        message.channel.setRateLimitPerUser(millisecond / 1000)
        message.channel.send(`**<:right:895367206160961577> Slowmode For This Channel Has Been Set To ${ms(millisecond, {
            long: true,
        })}**`)
    }
}    