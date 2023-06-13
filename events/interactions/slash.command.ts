import { ChatInputCommandInteraction, EmbedBuilder, Events } from 'discord.js'
import { ExtendedClient } from '../../classes/extendedClient'
import { Command } from '../../interfaces/command'
import config from '../../config.json'

export default {
    name: Events.InteractionCreate,
    description: 'Handles slash commands',
    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void> {
        if (!interaction.isChatInputCommand()) return

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTimestamp()

        const commandName = interaction.commandName
        const command = client.commands.get(commandName) as Command
        if (!command) {
            await interaction.reply({ embeds: [embed.setDescription('This command is outdated.')], ephemeral: true })
            return
        }

        if (command.developer && !config.developers.some(dev => dev.id === interaction.user.id)) {
            await interaction.reply({ embeds: [embed.setDescription('This command is developer-only.')], ephemeral: true })
            return
        }

        const subcommandName = interaction.options.getSubcommand(false)
        if (subcommandName) {
            const subcommand = command.subcommands?.find(sub => sub.name === subcommandName)
            if (!subcommand) {
                await interaction.reply({ embeds: [embed.setDescription('This sub-command is outdated.')], ephemeral: true })
                return
            }

            subcommand.execute(interaction, client)
        } else {
            command.execute(interaction, client)
        }
    }
}
