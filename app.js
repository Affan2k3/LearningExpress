

const express = require('express')
const logger = require('./middleware')

const Joi = require('joi')
const app = express()

app.use( express.json())
// app.use( express.json())




app.get('/', (req, res) => {
    res.send("HEllp world")
})

app.get('/api/name',(req, res)=> {
    res.send('Affan')
})

app.get('/api/age',(req, res)=> {
    res.send([20])})


const port = process.env.PORT || 3000
app.listen(port, () => {    
    console.log(`listening on port ${port}`)
})


const person = [
    {
    id: 1,
    name:"affan"

    },
    {
        id: 2,
        name:"Ammar"
    },
    {
        id: 3,
        name:"HELLO"
    }

]


app.post('/api/name', (req, res) => {
   const {error}= validateName(req.body)
 
    if (
        error
    ) {
        res.status(400).send(error.details[0].message)
    return
    }

    const name = {
        id: person.length + 1,
        name: req.body.name
    }
    person.push(name)
    res.send(name)
    console.log(person)
})


app.get('/api/name/:id', (req, res) => {

    const specificPerson = person.find(item => item.id == req.params.id)
    if (!specificPerson) 
      {  res.status(404).send(`There is no user with id ${req.params.id}`)}
    else {

        res.send(
            `You have searched for ${specificPerson.name}`
            )
        }
})


app.get('/api/names', (req, res) => {
    res.send(person)
})


app.put('/api/name/:id', (req, res) => {
    const specificPerson = person.find(item => item.id == req.params.id)
    if (!specificPerson) {
      return  res.status(404).send(`There is no user with id ${req.params.id}`)
    }

    const {error} = validateName(req.body)
     
if (
    error
) {
    res.status(400).send(error.details[0].message)
return
    } 
    
    specificPerson.name =   req.body.name
    res.send(specificPerson)
console.log(person)

})

function validateName(name) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    
    return  Joi.validate(name, schema)
}

app.delete('/api/name/:id', (req, res) => {
    const specificPerson = person.find(item => item.id == req.params.id)
    if (!specificPerson) {
      return  res.status(404).send(`There is no user with id ${req.params.id}`)
    }

    const index = person.indexOf(specificPerson)
    person.splice(index, 1)

    res.send(specificPerson)
})