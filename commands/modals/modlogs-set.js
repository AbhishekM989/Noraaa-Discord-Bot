const { Client, Message, MessagEmbed } = require("discord.js");
const Schema = require("../modals/modlogs")

module.exports = {
    name: 'set-logs',


    run: async(client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return;
        const channel = message.mentions.channels.first() || message.channel;

        Schema.findOne({Guild: message.guild.id}, async(err, data) => {
            if(data) data.delete();
            new Schema ({
                Guild: message.guild.id,
                Channel: channel.id
            }).save()
            message.channel.send(`<:right:895367206160961577> ${channel}Has Been Set As The Modlogs Channel !`)
        })
    }
}