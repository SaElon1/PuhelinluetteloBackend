const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
]

app.use(morgan('tiny'))

app.get('/api/persons', (request, response) => { 
  response.json(persons)
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
  const person = request.body
  person.id = idGenerator()

  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  if (persons.find(existingPerson => existingPerson.name === person.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  persons = persons.concat(person)
  response.json(person)
})

const idGenerator = () => {
  const maxId = 10000
  return (Math.floor(Math.random() * maxId))
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



  


