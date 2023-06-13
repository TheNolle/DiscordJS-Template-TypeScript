import { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with bot latency and API latency'),
    async execute(interaction: ChatInputCommandInteraction, client: Client) {
        const now = Date.now()

        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setDescription(`
                Bot latency: ${now - interaction.createdTimestamp}ms
                API latency: ${client.ws.ping}ms
            `)
            .setColor('Random')
            .setTimestamp()

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}