const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
let habits = []

app.listen(port, () =>{
    console.log(`the server works for now`)
})


app.get('/',(req, res)=>{
    res.sendStatus(200)
    res.send('express is still working')
})
app.post('/',(req,res)=>{
    habits.push(req.body)
    res.json({ message: 'Habit logged!' });
})


