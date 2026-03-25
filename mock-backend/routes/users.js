const express = require('express')
const { readData, writeData } = require('../utils/dataManager')

const router = express.Router()

// GET all users
router.get('/', (req, res) => {
    try {
        const data = readData()
        res.json(data.users || [])
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' })
    }
})

// GET user by ID
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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

module.exports = router
