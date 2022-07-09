require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { request, response } = require('express')

morgan.token('data', (req) => {
  return req.method === 'POST' && JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]


app.get('/info', (request, response) => {
  const date = new Date()
  Person.find({}).then(persons => {
    console.log(persons)
    response.send(
      `
            <div>
                <p>Phonebook has info for ${persons.length}</p>
                <span>${date}</span>
            </div>
        `
    )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    console.log(persons)
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  // const id = +request.params.id;
  // const person = persons.find((person) => person.id === id);
  //
  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }

  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if (!body.name || !body.number) {
  //   console.log("provide name and number");
  //   return response.status(400).json({
  //     error: "name or number is missing",
  //   });
  // }

  // persons.forEach((person) => {
  //   if (body.name === person.name) {
  //     return response.status(400).json({
  //       error: "name must be unique",
  //     });
  //   }
  // });
  //
  // const person = {
  //   id: generateId(),
  //   name: body.name,
  //   number: body.number,
  // };
  //
  // persons = persons.concat(person);


  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = +request.params.id
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'MongoServerError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
