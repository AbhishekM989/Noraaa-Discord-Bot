const {MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "userinfo",
    aliases: ['ui'],
    category: 'Information',
    description: 'Shows The User Info',

    run: async (client, message, args,) => {
        const member = message.mentions.members.first() || message.member
        const flags = {
            DISCORD_EMPLOYEE: '<:Staff:895362781413527563>',
            DISCORD_PARTNER: '<:partner:895367206152585236>',
            BUGHUNTER_LEVEL_1: '<:BugHunter:895362787491078224>',
            BUGHUNTER_LEVEL_2: '<:BugHunterGold:895362785406504970>',
            HYPESQUAD_EVENTS: '<:HypeSquad:895362782977998878>',
            HOUSE_BRAVERY: '<:Bravery:895362774115442779>',
            HOUSE_BRILLIANCE: '<:Brilliance:895362774539067453>',
            HOUSE_BALANCE: '<:Balance:895362779433820160>',
            EARLY_SUPPORTER: '<:Earlysupporter:895362779786149970>',
            TEAM_USER: 'Team User',
            SYSTEM: '<:System:847391844559486986> ',
            VERIFIED_BOT: '<:Verified:895362779773554709>',
            VERIFIED_DEVELOPER: '<:BotDev:895362774249644053>'
        };

        const roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);

        const userFlags = (member.user.flags ? member.user.flags.toArray() : []);

        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor('#00ff9e')
            .addField('__User Information__', [
                `**❯ Badges:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}`,
                `**❯ Tag:** ${member.user.tag}`,
                `**❯ ID:** ${member.id}`,
                `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} (${moment(member.user.createdTimestamp).fromNow()})`,
                `\u200b`
            ])

            .addField('__Member Information__', [
                `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**❯ Display Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                `**❯ Joinned:** ${moment(member.joinedAt).format('LL LTS')}`,
                `**❯ Roles [${roles.length}]:** ${roles.slice(0, 10).join(', ') || 'None'}`,
                `\u200b`
            ])

            .setFooter(
                `${client.user.username} Is Made With ❤️`,
                message.author.displayAvatarURL({ dynamic: true })
            )

            message.channel.send(embed)
    }
}