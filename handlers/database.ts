import mongoose from 'mongoose'
import config from '../config.json'

export function connectToDatabase() {
    mongoose.connect(config.mongodb)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => console.log('Database connected successfully'))
}