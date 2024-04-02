const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        const parts = v.split('-')
        if (parts.length !== 2) {
          return false
        }

        const firstPart = parts[0]
        if (!/^\d{2,3}$/.test(firstPart)){
          return false
        }

        const secondPart = parts[1]
        if (!/^\d{5,}$/.test(secondPart)){
          return false
        }

      }
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)