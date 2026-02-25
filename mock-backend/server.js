const express = require('express')
const app = express()
const port = 3000

app.listen(3000, () =>{
    console.log(`the server works for now`)
})
app.use(express.json())

let habits =[]

app.get('/habits',(req, res)=>{
    res.send('hi, ya')
})
app.get(`/login`,(req,res)=>{
    res.send(`login page`)
})

app.post()

app.get()