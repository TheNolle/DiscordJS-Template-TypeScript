import { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } from 'discord.js'
import config from '../../config.json'

export default {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('About the bot'),
    async execute(interaction: ChatInputCommandInteraction, client: Client) {
        const embed = new EmbedBuilder()
            .setTitle('📄 About')
            .setDescription(`
                Hello, I'm **${client.user?.username}**!
                I'm the multi-purpose bot for the **${client.guilds.cache.size}** servers I'm in and **${client.users.cache.size}** users I'm serving.
                I was created by ${client.users.cache.get(config.developers[0].id)} with :heart: and am currently on version **${require('../../package.json').version}**.
                I am fully open-source and you can find my source code on [GitHub](https://github.com/TheNolle/DiscordTS-Bot-Template).
            `)
            .addFields({
                name: ':link: Links',
                value: [
                    `- [Repository](https://github.com/TheNolle/DiscordTS-Bot-Template)`,
                    `- [Developer's Discord Server](https://discord.com/invite/86yVsMVN9z)`,
                    `- [Patron](https://www.patreon.com/_nolly)`,
                    `- [Ko-fi](https://ko-fi.com/nolly__)`,
                    `- [Github Sponsors](https://github.com/sponsors/TheNolle)`,
                ].join('\n')
            })
            .addFields({
                name: ':computer: Tech Stack',
                value: [
                    `- [Discord.js](https://discord.js.org/#/) (${require('../../package.json').dependencies['discord.js'].replace('^', '')})`,
                    `- [TypeScript](https://www.typescriptlang.org/) (${require('typescript').version})`,
                    `- [Node.js](https://nodejs.org/en/) (${process.version})`,
                ].join('\n')
            })
            .setTimestamp()
            .setColor('Random')

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}