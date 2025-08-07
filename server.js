import express from 'express'

const app = express()
app.use(express.json())

const users = []

app.post('/users', (request, response) => {

    users.push(request.body)

    response.status(201).json(request.body)

})

app.get('/users', (request, response) => {
    response.status(200).json(users)
})

app.listen(3000)


//CRIAR LISTAGEM DE USUARIOS




