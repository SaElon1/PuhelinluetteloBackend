const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://saelon:${password}@cluster0.srsd670.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = new mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

if (process.argv.length === 3){
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
            mongoose.connection.close()
        })
    })

} else if (process.argv.length > 3) {
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}





