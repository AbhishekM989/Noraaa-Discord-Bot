const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require('../modals/blacklist-servers')

module.exports = {
    name: "blacklist-remove",
    description: "Removes A Server From Blacklist Database",
    category: "Blacklist",
    ownerOnly: true,

    run: async(client, message, args) => {
        const id = args[0]

        if(!id) return message.channel.send('**<:wrong:895367205875769354> Please Specify A Server !**')
        schema.findOne({
            Server: id
        }, async(err, data) => {
            if(!data) return message.channel.send('**<:wrong:895367205875769354> That Server Id Does Not Exist In The Database !**')

            data.delete();
            message.channel.send('**<:right:895367206160961577> Removed The Server From Blacklist Database !**')
        })
    }

}