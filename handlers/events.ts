import { table } from 'table'
import { Client } from 'discord.js'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

function loadEvent(client: Client, filePath: string): string[] {
    const event = require(filePath).default

    if (!event.disabled) {
        if (event.rest) event.once ? client.rest.once(event.name, (...args) => event.execute(...args)) : client.rest.on(event.name, () => event.execute(client))
        else event.once ? client.once(event.name, (...args) => event.execute(...args)) : client.on(event.name, () => event.execute(client))
    }

    return [event.name, event.description, event.rest ? '❌' : '✅', event.once ? '❌' : '✅', event.disabled ? '❌' : '✅']
}

function loadDirectory(client: Client, directory: string): string[][] {
    let data = []

    const files = readdirSync(directory)

    for (const file of files) {
        const filePath = join(directory, file)

        if (statSync(filePath).isDirectory()) {
            data.push(...loadDirectory(client, filePath))
        } else if (filePath.endsWith('.ts')) {
            data.push(loadEvent(client, filePath))
        }
    }

    return data
}

export function loadEvents(client: Client): void {
    const data = [['Name', 'Description', 'Rest', 'Once', 'Status'], ...loadDirectory(client, join(__dirname, '../events'))]

    console.log(table(data))
}
