require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const middleware = require('./middleware')
const phonebook = require('./mongo')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// morgan token for logging the body
// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, _) => JSON.stringify(req.body))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
  ),
)

const validation = async (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    res.status(400).json({
      error: 'name or number missing',
    })
    return false
  }

  const nameRegex = new RegExp('^[a-zA-Z ]+$')
  if (!nameRegex.test(name)) {
    res.status(400).json({
      error: 'name must contain only letters and spaces',
    })
    return false
  }

  const numberRegex = new RegExp('^[0-9]+$')
  if (!numberRegex.test(number)) {
    res.status(400).json({
      error: 'number must contain only numbers',
    })
    return false
  }

  const searchPerson = await phonebook.find({ number })
  if (searchPerson.length > 0) {
    res.status(400).json({
      error: 'number must be unique',
    })
    return false
  }

  return true
}

const formatPhonebook = (phonebook) => {
  return {
    id: phonebook._id,
    name: phonebook.name,
    number: phonebook.number,
  }
}

app.get('/', (_, res) => {
  res.send('Welcome to phonebook app!')
})

app.get('/info', async (_, res) => {
  const count = await phonebook.countDocuments()
  const date = new Date()

  res.send(`
		<p>Phonebook has info for ${count} people</p>
		<p>${date}</p>
	`)
})

app.get('/api/persons', async (_, res) => {
  try {
    const persons = await phonebook.find({})
    res.json(persons.map(formatPhonebook))
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/persons', async (req, res, next) => {
  try {
    const isValid = await validation(req, res)
    if (isValid) {
      const person = new phonebook({
        name: req.body.name,
        number: req.body.number,
      })
      const savedPerson = await person.save()
      res.json(formatPhonebook(savedPerson))
    }
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await phonebook.findById(req.params.id)
    if (person) {
      res.json(formatPhonebook(person))
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const isValid = await validation(req, res)
    if (isValid) {
      const person = {
        name: req.body.name,
        number: req.body.number,
      }
      const updatedPerson = await phonebook.findByIdAndUpdate(
        req.params.id,
        person,
        { new: true },
      )
      res.json(formatPhonebook(updatedPerson))
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    await phonebook.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
