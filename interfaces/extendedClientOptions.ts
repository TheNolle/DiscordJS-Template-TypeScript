import { ClientOptions, Collection } from 'discord.js'
import { Command } from './command'
import { Subcommand } from './subcommand'

export interface ExtendedClientOptions extends ClientOptions {
    commands?: Collection<string, Command>
    subcommands?: Collection<string, Subcommand>
}
