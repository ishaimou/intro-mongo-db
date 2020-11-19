const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
}

const student = new mongoose.Schema({
    firstName: String
})

const Student = mongoose.model('student', student)

connect()
    .then(async connection => {
        const student = await Student.create({
            firstName: 'me'
        })
        console.log(student)
    })
    .catch(e => console.log(e))