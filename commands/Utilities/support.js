const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'support',
    category: 'Utilities',
    description: 'Provides Our Discord Server Link',

    run: async(client, message, args) => {
        message.channel.send('**Join ❯ ** https://discord.js/fFARebrTat')
    }
} 