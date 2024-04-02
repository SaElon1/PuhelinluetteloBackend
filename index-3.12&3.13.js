require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let persons = [
]

app.use(morgan('tiny'))

app.get('/api/persons', (request, response) => { 
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {
  const requestTime = new Date().toString()
  const personsCount = persons.length
  const infoMessage = `Phonebook has info for ${personsCount} people`

  response.send(`
    <div>
    <p>${infoMessage}</p>
    <p>${requestTime}</p>
    </div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id',(request,response) => {
  const id = Number(request.params.id)
  person = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body || !body.name || !body.number) {
    return response.status(400).json({error: 'information missing'})
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



  


