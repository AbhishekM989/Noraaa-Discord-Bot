const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'Utilities',
    description : 'Returns The Latency Of The Bot',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

        const msg = await message.channel.send("Pinging.....")

        const latency = msg.createdTimestamp - message.createdTimestamp;
        const choices = ['I Am Nervous', 'My Heartbeat', 'Is That Okay?']
        const response = choices[Math.floor(Math.random() * choices.length)];

        msg.edit(`${response} - **Bot Latency**: \`${latency}ms\`, **API Latency**: \`${(message.client.ws.ping)}ms\`.`)

    }
}
