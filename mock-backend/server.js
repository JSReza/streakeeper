const express = require('express')
const cors = require('cors')
const usersRouter = require('./routes/users')
const habitsRouter = require('./routes/habits')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

// Mount route handlers
app.use('/api/users', usersRouter)
app.use('/api/habits', habitsRouter)

app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`)
})