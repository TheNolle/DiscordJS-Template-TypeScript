import { Client, Collection, ClientOptions } from 'discord.js'
import { Command } from '../interfaces/command'
import { Subcommand } from '../interfaces/subcommand'
import { ExtendedClientOptions } from '../interfaces/extendedClientOptions'

export class ExtendedClient extends Client {
    commands: Collection<string, Command>
    subcommands: Collection<string, Subcommand>

    constructor(options?: ExtendedClientOptions) {
        super(options as ClientOptions)
        this.commands = options?.commands ?? new Collection<string, Command>()
        this.subcommands = options?.subcommands ?? new Collection<string, Subcommand>()
    }
}
