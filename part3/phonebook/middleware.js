const unknownEndpoint = (_, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, _, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}
