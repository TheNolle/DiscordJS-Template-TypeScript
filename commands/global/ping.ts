import { SlashCommandBuilder, ChatInputCommandInteraction, Client } from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with bot latency and API latency'),
    async execute(interaction: ChatInputCommandInteraction, client: Client) {
        await interaction.reply({
            content: `🏓 Pong! Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`,
            ephemeral: true
        })
    }
}