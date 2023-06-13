import { ChatInputCommandInteraction, Client } from 'discord.js'
import { Subcommand } from './subcommand'

export interface Command {
    name: string
    developer: boolean
    execute: (interaction: ChatInputCommandInteraction, client: Client) => void
    subcommands?: Subcommand[]
}
