import express from 'express'
import chalk from 'chalk'
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'mongodb'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/users', async (request, response) => {
   await prisma.user.create({
        data: {
             email: request.body.email,
             name: request.body.name,
             age: request.body.age,
        }
    })

    response.status(201).json(request.body)

})

app.get('/users', async(request, response) => {
    const users = await prisma.user.findMany()
    response.status(200).json(users)
})

app.get('/users/:id', async(request, response) =>{
    const userId = request.params.id

    if(!ObjectId.isValid(userId))
        throw new Error ("Invalid Id")

    const foundUser = await prisma.user.findUnique({where: {id:userId}})
 
    if (!foundUser)
        throw new Error("user not found")

    response.status(200).json(foundUser)
}
)

app.listen(3000, ()=>{
    console.log(chalk.green('server running at http://localhost:3000'))
})


//CRIAR LISTAGEM DE USUARIOS




