const fs = require('fs')
const path = require('path')

const defaultDataPath = path.join(__dirname, '../data.json')
const dataPath = process.env.DATA_FILE ? path.resolve(process.env.DATA_FILE) : defaultDataPath

function ensureDataFile() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({ users: [], habits: [] }, null, 2), 'utf8')
    }
}

function readData() {
    ensureDataFile()

    try {
        const data = fs.readFileSync(dataPath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading data:', error)
        return { users: [], habits: [] }
    }
}

function writeData(data) {
    ensureDataFile()

    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8')
    } catch (error) {
        console.error('Error writing data:', error)
        throw error
    }
}

module.exports = { readData, writeData }
