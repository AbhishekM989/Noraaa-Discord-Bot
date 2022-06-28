// const { Client, Message, MessageEmbed } = require("discord.js");
// const got = require("got");

// module.exports = {
//     name: 'meme',
//     category: 'Fun',
//     description: 'Sends A Random Meme',

//     run: async(client, message, args) => {
//         const embed = new MessageEmbed()
//         got('httpsa://www.reddit.com/r/memes/random/.json')
//         .then((response) => {
//         const content = JSON.parse(response.body);
//         const { url, title } = content[0].data.children[0].data;
//         embed.setTitle(`**${title}**`);
//         embed.setImage(url);
//         embed.setColor('#00ff9e');
//         embed.setFooter(
//             `${client.user.username} Is Made With ❤️`,
//             message.author.displayAvatarURL({ dynamic: true })
//         );
//         message.channel.send(embed);
//       })
//       .catch(console.error);
        
//     }
// }