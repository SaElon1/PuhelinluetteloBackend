const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



  


