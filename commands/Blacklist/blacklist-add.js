const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require('../modals/blacklist-servers')

module.exports = {
    name: "blacklist-add",
    description: "Adds A Server To Blacklist Database",
    category: "Blacklist",
    ownerOnly: true,

    run: async(client, message, args) => {
        const id = args[0]

        if(!id) return message.channel.send('**<:wrong:895367205875769354> Please Specify A Server !**')

        if(!client.guilds.cache.has(id)) return message.channel.send('**<:wrong:895367205875769354> I Am Not In That Server !**')

        schema.findOne({
            Server: id
        }, async(err, data) => {
            if(data) return message.channel.send('**<:right:895367206160961577> This Server Has Already Been Blacklisted !**')

            new schema({
                Server: id
            }).save()
            message.channel.send('**<:right:895367206160961577> Added This Server In Blacklist Server Database !**')
        })
    }

}