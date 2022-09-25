import { Request, Response, Router } from "express"

const invoiceRouter = Router()

// GET
invoiceRouter.get('/invoices', async (req: Request, res: Response) => {
  const invoices = await req.app.locals.invoice.getAll(req.query.include)

  res.send(invoices)
})

// GET :id
invoiceRouter.get('/invoices/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const results = await req.app.locals.invoice.get(id)

  if (!results) {
    return res.status(404).send(`Invoice with id "${id}" not found`)
  }

  return res.send(results)
})


// CREATE
invoiceRouter.post('/invoices', async (req: Request, res: Response) => {
  const invoice = await req.app.locals.invoice.create(req.body)

  if (invoice.error) {
    if (invoice.message) {
      return res.status(400).send(invoice.message)
    }

    return res.status(400).send(invoice.error)
  }

  return res.send(invoice)
})


// UPDATE
invoiceRouter.patch('/invoices/:id', async (req: Request, res: Response) => {
  const invoice = await req.app.locals.invoice.update(req.body)

  if (invoice.error) {
    if (invoice.message) {
      return res.status(400).send(invoice.message)
    }

    return res.status(400).send(invoice.error)
  }

  return res.send(invoice)
})


// DELETE
invoiceRouter.delete('/invoices/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const deletedinvoice = await req.app.locals.invoice.delete(id)

  if (!deletedinvoice.affected) {
    return res.status(404).send(`Invoice with id "${id}" not found`)
  }

  return res.send(deletedinvoice)
})

export default invoiceRouter
