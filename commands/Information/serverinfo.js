const {MessageEmbed} = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    aliases: ['si'],
    category: 'Information',
    description: 'Shows The Server Info',

    run: async (client, message, args) => {
        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };

        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: 'High',
            VERY_HIGH: 'Highest'
        };

        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydeny: 'Sydeny',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };
        


        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const emojis = message.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setDescription(`**Guild information for __${message.guild.name}__**`)
            .setColor('#00ff9e')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setImage(message.guild.bannerURL({ size: 4096, dynamic: true }))
            .addField('__General Information__', [
                `**❯ Name:** ${message.guild.name}`,
                `**❯ ID:** ${message.guild.id}`,
                `**❯ Owner:** ${message.guild.owner} (\`${message.guild.ownerID}\`)`,
                `**❯ Voice Region:** ${regions[message.guild.region]}`,
                `**❯ Maximum Member Limit:** ${message.guild.maximumMembers}`,
                `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})`,
                '\u200b'
            ])
            .addField('__Server Statistics__', [
                `**❯ Members:** ${message.guild.memberCount}`,
                `**❯ Channels:** ${message.guild.channels.cache.size}`,
                `**❯ Emojis:** ${emojis.size}`,
                `**❯ Roles:** ${roles.length}`,
                '\u200b'
            ])
            .addField('__More Statistics__', [
                `**❯ Boosts:** ${message.guild.premiumTier ? `Level ${message.guild.premiumTier}` : 'Level 0'} with ${message.guild.premiumSubscriptionCount || '0'} boosts`,
                `**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**❯ Features Unlocked:** ${message.guild.features || 'Nothing has unlocked yet!'}`,
                '\u200b'
            ])

            .setFooter(
                `${client.user.username} Is Made With ❤️`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            return message.channel.send(embed)
    }
}    