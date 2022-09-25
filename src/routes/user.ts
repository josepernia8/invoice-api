import { Request, Response, Router } from "express"
import { AppDataSource } from "..//data-source"
import { User } from '../entity'
import { validate } from "class-validator"

const userRouter = Router()

// GET
userRouter.get('/users', async (_req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(User).find()

  res.send(users)
})

// GET :id
userRouter.get('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const users = await AppDataSource.getRepository(User).findOneBy({id})

  if (!users) {
    return res.status(404).send(`User with id "${id}" not found`)
  }

  return res.send(users)
})


// CREATE
userRouter.post('/users', async (req: Request, res: Response) => {
  const userRepository = await AppDataSource.getRepository(User)
  const user = userRepository.create(req.body)
  const errors = await validate(user)

  if (errors.length) {
    return res.status(400).send(errors)
  }

  return res.send(await userRepository.insert(user))
})


// UPDATE
userRouter.patch('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const userRepository = await AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({id})

  if (!user) {
    return res.status(404).send(`User with id "${id}" not found`)
  }

  const updatedUser = AppDataSource.getRepository(User).merge(user, req.body)
  const errors = await validate(updatedUser)

  if (errors.length) {
    return res.status(400).send(errors)
  }

  await AppDataSource.getRepository(User).save(user)
  return res.send(await userRepository.findOneBy({id})) // Return full updated element including generated types
})


// DELETE
userRouter.delete('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const deletedUser = await AppDataSource.getRepository(User).delete(id)

  if (!deletedUser) {
    return res.status(404).send(`User with id "${id}" not found`)
  }

  return res.send(deletedUser)
})

export default userRouter
