import { Events } from 'discord.js'
import { loadCommands } from '../../handlers/commands'
import { ExtendedClient } from '../../classes/extendedClient'

export default {
    name: Events.ClientReady,
    description: 'Emitted when the client becomes ready to start working',
    once: true,
    async execute(client: ExtendedClient) {
        await loadCommands(client)
        console.log(`Logged in as ${client.user?.tag} !`)
    }
}