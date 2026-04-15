const express = require('express')
const cors = require('cors')
const usersRouter = require('./routes/users')
const habitsRouter = require('./routes/habits')

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
}

app.use(express.json())
app.use(cors(corsOptions))

// Mount route handlers
app.use('/api/users', usersRouter)
app.use('/api/habits', habitsRouter)

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    if (process.env.NODE_ENV) {
        console.log(`Environment: ${process.env.NODE_ENV}`)
    }
})