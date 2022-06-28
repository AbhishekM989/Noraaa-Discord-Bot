const premiumSchema = require('../modals/premium');
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "add-premium",
    description: "Adds A User To Premium Club !",
    category: "Premium",
    ownerOnly: true,
    
    run: async(client, message, args) => {
        
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!member) return message.channel.send('**<:wrong:895367205875769354> Please Specify A Member !**')

        premiumSchema.findOne({
            User: member.id
        }, async(err, data) => {
            if(data) return message.channel.send('**<:right:895367206160961577> This User Has Already Gained Premium Rights !**')

            new premiumSchema({
                User: member.id
            }).save();
                return message.channel.send(`**<:right:895367206160961577> Added ${member} To The Premium Database !**`)
        })
    }
}