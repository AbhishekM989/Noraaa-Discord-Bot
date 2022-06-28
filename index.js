const { Intents, Collection, Client, MessageEmbed, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disabledMention: true
})
const config = require('./config.json')
const { badwords } = require('./data.json')
const prefix = config.prefix
const token = config.token
const modlogsSchema = require('./commands/modals/modlogs');
module.exports = client;
const mongoDBURL = require('./config.json').mongoDBURL
const mongoose = require('mongoose')
mongoose.connect(mongoDBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('Connected To MongoDB Database'))



client.commands = new Collection();
client.aliases = new Collection();
client.config = require('./config.json')
client.modlogs = async function({ Member, Action, Color, Reason }, message) {
    const data = await modlogsSchema.findOne({ Guild: message.guild.id });
    if(!data) return;

    const channel = message.guild.channels.cache.get(data.Channel);
    const logsEmbed = new MessageEmbed()
        .setColor(Color)
        .setDescription(`**Reason :-** ${Reason || '**No Reason Provided**'}`)
        .setThumbnail(Member.user.displayAvatarURL())
        .addField('**Member :-**', `${Member.user.tag} (${Member.id})`)
        .setTitle(`**Action Took :-** ${Action}`)

    channel.send(logsEmbed)

}
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.login(token)
