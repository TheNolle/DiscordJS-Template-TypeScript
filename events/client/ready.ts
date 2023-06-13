import { Client, Events } from 'discord.js'

export default {
    name: Events.ClientReady,
    description: 'Emitted when the client becomes ready to start working',
    once: true,
    disabled: true,
    /**
     * @param {Client} client
     */
    async execute(client: Client) {
        console.log(`Logged in as ${client.user?.tag} !`)
    }
}
