import { Request, Response, Router } from "express"
import { AppDataSource } from "..//data-source"
import { Client } from '../entity'

const clientRouter = Router()

// GET
clientRouter.get('/clients', async (_req: Request, res: Response) => {
  const clients = await AppDataSource.getRepository(Client).find()

  res.send(clients)
})

export default clientRouter
