const { afk } = require('../commands/Collection')
const client = require('../index')
const moment = require('moment')
client.on('message', async(message) => {
    if(!message.guild || message.author.bot) return;

    const mentionedMember = message.mentions.members.first();
    if(mentionedMember) {
        const data = afk.get(mentionedMember.id);

        if(data) {
            const [timestamp, reason] = data
            const timeAgo = moment(timestamp).fromNow();

            message.channel.send(`\`${mentionedMember.user.username}\` Is AFK: ${reason} - ${timeAgo}`)

        }
    }

    const getData = afk.get(message.author.id)
    if(getData) {
        afk.delete(message.author.id)
        message.channel.send(`Welcome Back! ${message.member}, I Removed Your AFK`).then(msg => {
            msg.delete({ timeout: 4000 })
          })
    }
})