const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

app.listen(3000, () =>{
    console.log(`the server works for now`)
})


let habits =[]

app.get('/',(req, res)=>{
    res.send('express is still working')
})
app.get(`/login`,(req,res)=>{
    res.send(`login page`)
})

app.post()

