import { table } from 'table'
import { Client } from 'discord.js'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

function loadEvent(client: Client, filePath: string): string[] {
    const event = require(filePath).default

    if (!event.disabled) {
        if (event.once) {
            if (event.rest) {
                client.once(event.name, (...args) => event.execute(...args))
            } else {
                client.once(event.name, () => event.execute(client))
            }
        } else {
            if (event.rest) {
                client.on(event.name, (...args) => event.execute(...args))
            } else {
                client.on(event.name, () => event.execute(client))
            }
        }
    }

    return [event.name, event.description, event.rest ? 'Yes' : 'No', event.once ? 'Yes' : 'No', event.disabled ? '❌' : '✅']
}

function loadDirectory(client: Client, directory: string): string[][] {
    let data = [['Name', 'Description', 'Rest', 'Once', 'Status']]

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
    const data = loadDirectory(client, join(__dirname, '../events'))

    console.log(table(data))
}
