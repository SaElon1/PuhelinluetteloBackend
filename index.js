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
  Person.countDocuments({}).then(count => {
    const infoMessage = `Phonebook has info for ${count} people`
      response.send(`
        <div>
        <p>${infoMessage}</p>
        <p>${requestTime}</p>
        </div>`)
  })
  .catch(error => {
    response.status(500).send('Server error')
  })
  })


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id',(request,response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }else if(error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



  


