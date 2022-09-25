import express, { Express, NextFunction, Request, Response } from "express"
import routes from "./routes"
import { AppDataSource } from "./data-source"
import { InvoiceService, populate } from "./services"

AppDataSource
    .initialize()
    .then(async () => {
        populate()
        console.info('⚡️[server]: Data Source has been initialized and populated with Data!')
    })
    .catch(error => console.error('⚡️[server]: Error during Data Source initialization:', error))

const app: Express = express()

// Get Singleton Instance of Invoice Service
app.locals.invoice = InvoiceService

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req: Request, res: Response) => res.send('Welcome to the Invoice API'))

// Add Routes
app.use('/api', routes)

export default app
