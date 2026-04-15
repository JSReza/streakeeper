const express = require('express')
const { readData, writeData } = require('../utils/dataManager')

const router = express.Router()

// GET habits for a specific user
router.get('/', (req, res) => {
    try {
        const data = readData()
        const userId = req.query.userId ? parseInt(req.query.userId) : undefined

        if (!userId || Number.isNaN(userId)) {
            return res.status(400).json({ error: 'userId query parameter is required and must be a valid number' })
        }

        const habits = (data.habits || []).filter(h => h.userId === userId)
        res.json(habits)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch habits' })
    }
})

// GET habit by ID
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router
