const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000
const cors = require('cors')
const dataPath = path.join(__dirname, 'data.json')

app.use(express.json())
app.use(cors())

app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`)
})

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

// ============ USER ENDPOINTS ============

// GET all users
app.get('/api/users', (req, res) => {
    try {
        const data = readData()
        res.json(data.users || [])
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' })
    }
})

// GET user by ID
app.get('/api/users/:id', (req, res) => {
    try {
        const data = readData()
        const user = data.users?.find(u => u.id == req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' })
    }
})

// POST create new user
app.post('/api/users', (req, res) => {
    try {
        const { username, email } = req.body
        if (!username) {
            return res.status(400).json({ error: 'Username is required' })
        }
        const data = readData()
        if (!data.users) data.users = []
        
        // Check if username already exists
        if (data.users.some(u => u.username === username)) {
            return res.status(400).json({ error: 'Username already exists' })
        }
        
        const newUser = {
            id: Date.now(),
            username,
            email: email || '',
            createdAt: new Date().toISOString().split('T')[0]
        }
        data.users.push(newUser)
        writeData(data)
        res.status(201).json({ message: 'User created!', user: newUser })
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' })
    }
})

// PUT update user
app.put('/api/users/:id', (req, res) => {
    try {
        const { username, email } = req.body
        const data = readData()
        const userIndex = data.users?.findIndex(u => u.id == req.params.id)
        
        if (userIndex === undefined || userIndex === -1) {
            return res.status(404).json({ error: 'User not found' })
        }
        
        data.users[userIndex] = {
            ...data.users[userIndex],
            username: username || data.users[userIndex].username,
            email: email !== undefined ? email : data.users[userIndex].email
        }
        writeData(data)
        res.json({ message: 'User updated!', user: data.users[userIndex] })
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' })
    }
})

// ============ HABIT ENDPOINTS ============

// GET all habits (optionally filtered by userId)
app.get('/api/habits', (req, res) => {
    try {
        const data = readData()
        const userId = req.query.userId ? parseInt(req.query.userId) : null
        
        let habits = data.habits || []
        if (userId) {
            habits = habits.filter(h => h.userId === userId)
        }
        res.json(habits)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch habits' })
    }
})

// GET habit by ID
app.get('/api/habits/:id', (req, res) => {
    try {
        const data = readData()
        const habit = data.habits?.find(h => h.id == req.params.id)
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' })
        }
        res.json(habit)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch habit' })
    }
})

// POST new habit
app.post('/api/habits', (req, res) => {
    try {
        const { habit, length, details, userId } = req.body
        
        if (!habit) {
            return res.status(400).json({ error: 'Habit name is required' })
        }
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' })
        }
        
        const data = readData()
        if (!data.habits) data.habits = []
        
        // Verify user exists
        if (!data.users?.find(u => u.id == userId)) {
            return res.status(404).json({ error: 'User not found' })
        }
        
        const newHabit = {
            id: Date.now(),
            userId: parseInt(userId),
            habit,
            date: new Date().toISOString().split('T')[0],
            length: length || 0,
            details: details || ''
        }
        data.habits.push(newHabit)
        writeData(data)
        res.status(201).json({ message: 'Habit logged!', habit: newHabit })
    } catch (error) {
        res.status(500).json({ error: 'Failed to log habit' })
    }
})

// PUT update habit
app.put('/api/habits/:id', (req, res) => {
    try {
        const { habit, length, details, date } = req.body
        const data = readData()
        const habitIndex = data.habits?.findIndex(h => h.id == req.params.id)
        
        if (habitIndex === undefined || habitIndex === -1) {
            return res.status(404).json({ error: 'Habit not found' })
        }
        
        data.habits[habitIndex] = {
            ...data.habits[habitIndex],
            habit: habit || data.habits[habitIndex].habit,
            date: date || data.habits[habitIndex].date,
            length: length !== undefined ? length : data.habits[habitIndex].length,
            details: details !== undefined ? details : data.habits[habitIndex].details
        }
        writeData(data)
        res.json({ message: 'Habit updated!', habit: data.habits[habitIndex] })
    } catch (error) {
        res.status(500).json({ error: 'Failed to update habit' })
    }
})

// DELETE habit
app.delete('/api/habits/:id', (req, res) => {
    try {
        const data = readData()
        const habitIndex = data.habits?.findIndex(h => h.id == req.params.id)
        
        if (habitIndex === undefined || habitIndex === -1) {
            return res.status(404).json({ error: 'Habit not found' })
        }
        
        data.habits.splice(habitIndex, 1)
        writeData(data)
        res.json({ message: 'Habit deleted!' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete habit' })
    }
})