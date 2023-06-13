import { table } from 'table'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { ExtendedClient } from '../classes/extendedClient'

function loadEvent(client: ExtendedClient, filePath: string): string[] {
    const event = require(filePath).default

    if (!event.disabled) {
        if (event.rest) event.once ? client.rest.once(event.name, (...args) => event.execute(...args, client)) : client.rest.on(event.name, (...args) => event.execute(...args, client))
        else event.once ? client.once(event.name, (...args) => event.execute(...args, client)) : client.on(event.name, (...args) => event.execute(...args, client))
    }

    return [event.name, event.description, event.rest ? '✅' : '❌', event.once ? '✅' : '❌', event.disabled ? '❌' : '✅']
}

function loadDirectory(client: ExtendedClient, directory: string): string[][] {
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

export function loadEvents(client: ExtendedClient): void {
    const events = loadDirectory(client, join(__dirname, '../events'))
    let data: string[][]

    if (events.length) data = [['Name', 'Description', 'Rest', 'Once', 'Status'], ...events]
    else data = [['No event found in the events folder']]

    console.log(table(data))
}
