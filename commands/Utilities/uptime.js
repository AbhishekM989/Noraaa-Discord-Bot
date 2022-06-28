const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
    name:  "uptime",
    aliases: ["ut"],
    description: "Shows The Uptime Of The Bot",
    category: "Utilities",

    run: async(client, message, args) => {
        message.channel.send(
            `My Current Uptime Is \`${ms(client.uptime, { long: true })}\`.`
        )
    }
}