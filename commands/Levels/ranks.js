const {Collection, Client, MessageEmbed} = require('discord.js')
const Discord = require('discord.js')
const Levels = require('discord-xp')
const canvacord = require('canvacord')

module.exports = {
    name: "rank",
    category: 'Levels',
    description: 'Shows The User Xp In The Server ',

    run: async(client, message, args) => {
        const target = message.mentions.users.first() || message.author; // Grab the target.

        const user = await Levels.fetch(target.id, message.guild.id, true); // Selects the target from the database.

        const needXp = Levels.xpFor(parseInt(user.level) + 1)

        if (!user) return message.channel.send("**Please Send Some Messages To Gain Xp**"); // If there isnt such user in the database, we send a message in general.

        const rank = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({dynamic : false, format: 'png'}))
        .setCurrentXP(user.xp)
        .setRequiredXP(needXp)
        .setStatus(message.author.presence.status, true, true)
        .setRank(user.position)
        .setLevel(user.level) 
        .setProgressBar("#03edf2", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator);

        rank.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
        });
    }    
}    