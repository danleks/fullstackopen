const mongoose = require('mongoose')

if (process.argv < 3) {
  console.log('Please provide at least the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.qyoub.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected')

      const person = new Person({
        name,
        number,
      })

      return person.save()
    })
    .then(() => {
      console.log('person saved')
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
} else if (password) {
  mongoose.connect(url)
  Person.find({}).then(result => {
    let string = result.map(person => {
      const { name, number } = person
      return `${name} ${number}\n`
    }).join('')
    console.log(`phonebook:\n${string}`)
    mongoose.connection.close()
  })
}