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
    console.log(`the server works for now from http://localhost:${port}`)
})

//helper methods neccesary for reading and writing data that will be needed for CRUD methods
function readData(){
    const data = fs.readFileSync(dataPath)
    return JSON.parse(data)
}

function writeData(data){
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

app.get('/api/habits', (req, res) => {
  const data = readData();
  res.json(data.habits || []);
});

app.post('/api/habits', (req, res) => {
  const data = readData();
  if (!data.habits) data.habits = [];
  data.habits.push({
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    minutes: req.body.minutes,
    ...req.body
  });
  writeData(data);
  res.json({ message: 'Logged!', habits: data.habits });
});