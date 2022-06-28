const { Command, version: djs, MessageEmbed} = require('discord.js')
const { version: asc } = require('ascii-table')
const { version} = require('../../package.json')
const { utc } = require('moment')
const os = require('os')
const ms = require('ms')

module.exports = {
    name: 'about',
    aliases: ['bot', 'stats', 'info'],
    description: 'Gives Information About Bot',
    category: 'Utilities',

    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setThumbnail(
            client.user.displayAvatarURL({ size: 4096, dynamic: true})
        )
        .setColor("#00ff9e")
        .setTitle(`About ${client.user.username}`)
        .setImage(
            `https://cdn.discordapp.com/attachments/858014405102796810/893565846079803442/kurama_2.jpg`
        )
        .setDescription(
            `**${client.user.username} Is Made With ❤️**
            **${client.user.username} Is A Multitasking Discord Bot You Can Use It For Moderation And Server Management Purpose**`
        )
        .addField('__General Details__', [
            `**❯ Client:** ${client.user.username} (\`${client.user.id}\`)`,
            `**❯ Created On:** ${utc(client.user.createdTimestamp).format(
                'DD MMMM YYYY HH:mm:ss'
            )}`,
            `**❯ Developers:** Abhishek, Sahil & Agnel.`,
            '\u200b',
        ])
        .addField(
            '__Frontend Details__',
            [
              `**❯ Users:** ${client.guilds.cache
                .reduce((a, b) => a + b.memberCount, 0)
                .toLocaleString()}`,
              `**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
              `**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
              '\u200b',
            ],
            true
        )
        .addField(
            `__Backend Details__`,
            [
              `**❯ Version:** [v${version}](https://discord.gg/fFARebrTat)`,
              `**❯ Node.js:** [${process.version}](https://nodejs.org/en/)`,
              `**❯ Discord.js:** [v${djs}](https://discord.js.org/#/docs)`,
            ],
            true
        )
        
        .addField(
            `__Note__`, [
                `This Bot Is Official Bot Of **Team Valhalla**.`
            ]
        )
        .setFooter(
            `${client.user.username} Is Made With ❤️`,
            message.author.displayAvatarURL({ dynamic: true })
        )

    message.channel.send(embed)
    }
}