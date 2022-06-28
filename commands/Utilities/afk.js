const { Client, Message, MessageEmbed } = require('discord.js')
const { afk } = require('../Collection')

module.exports = {
    name: 'afk',
    category: 'Utilities',
    description: 'Set Status To Afk',

    run: async(client, message, args) => {
        const reason = args.join(' ') || 'AFK'

        afk.set(message.author.id, [Date.now(), reason])

        return message.reply(`I Set Your AFK: ${reason}` )
    }
}