const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../data.json')

// Helper methods for reading and writing data
function readData(){
    try {
        const data = fs.readFileSync(dataPath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading data:', error)
        return { users: [], habits: [] }
    }
}

function writeData(data){
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.error('Error writing data:', error)
    }
}

module.exports = { readData, writeData }
