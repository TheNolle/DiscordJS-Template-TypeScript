import { ChatInputCommandInteraction, Client } from 'discord.js'

export interface Subcommand {
    name: string
    execute: (interaction: ChatInputCommandInteraction, client: Client) => void
}
