const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

phonebookSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
});

(async () => {
  try {
    await mongoose.connect(url)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
  }
})()

module.exports = mongoose.model('Phonebook', phonebookSchema)
