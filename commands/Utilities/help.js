const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases : ['h'],
  category: 'Utilities',
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];
      const ignoredCategories = ['Collection', 'modals']

      readdirSync("./commands/").forEach((dir) => {
        if(ignoredCategories.includes(dir)) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("__Help Interface__")
        .setThumbnail('https://cdn.discordapp.com/attachments/858014405102796810/991305320087437352/3-robot.jpg')
        .addFields(categories)
        .setDescription(
          `
                    These Are The Commands Which You Can Use In **Noraaa**.
					For More Command Please Type \`${prefix}help <command>\`.
					`
        )
        .setFooter(
          'Sukuna Is Made With ❤️',
          message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`❯ Check Out`, [
        ` • [**Support**](https://discord.gg/rrhhYnUptw)` 
      ])
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "❯ ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : '`No Aliases For This Command.`'
            )
          .addField(
            "❯ DESCRIPTION:",
            command.description
               ? `\`${command.description}\``
               : '`No description for this command.`'
            )
          .addField(
            "❯ CATEGORY",
             command.category
            ?  `\`${command.category}\``
            : '`No Category Found.`'
          )  
          .addField(
            "❯ BOT PERMISSION:",
            command.botPermissions
              ? `\`${command.botPermissions}\``
              : '`Pemission Not Defined By Developers`'
          )
          .addField(
            "❯ USER PERMISSION:",
            command.userPermissions
              ? `\`${command.userPermissions}\``
              : '`Pemission Not Defined By Developers`'
          )
        .addField(
          "❯ USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .setFooter(
          `${client.user.username} Is Made With ❤️`,
          message.author.displayAvatarURL({ dynamic: true })
      )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};
