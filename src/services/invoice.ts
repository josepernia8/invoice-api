import { DeleteResult } from "typeorm"
import { AppDataSource } from "../data-source"
import { Client, Invoice, InvoiceItem, Item, User } from "../entity"
import { bodyError, DataItem, PatchInvoiceData, PostInvoiceData, RepoList, Status } from "../types"
import { validate } from "class-validator"

/**
 * @class
 * @classdesc Manage different operations on Invoices (create, approve, decline)
 * @Usage Don't import this class, get it from the request object (req.app.locals.invoice)
 */
class InvoiceService {
  private _repository: RepoList

  constructor() {
    this._repository = {
      user: AppDataSource.getRepository(User),
      client: AppDataSource.getRepository(Client),
      item: AppDataSource.getRepository(Item),
      invoiceItem: AppDataSource.getRepository(InvoiceItem),
      invoice: AppDataSource.getRepository(Invoice)
    }
  }

  /**
   * Get Specific Invoice
   *
   * @param {number} id of the Invoice
   * @returns {Invoice}
   */
   get = async (id: number): Promise<Invoice | null> => {
    const result = await this._repository.invoice.findOneBy({id})

    return result
  }

  /**
   * Get All Invoices
   *
   * @returns {Invoice}
   */
   getAll = async (includeRelations: string[]): Promise<Invoice[] | null> => {
    const relations: { [key: string]: boolean } = {}
    relations.user = includeRelations.includes('user')
    relations.client = includeRelations.includes('client')
    relations.invoiceItems = includeRelations.includes('invoiceItems')

    const result = await this._repository.invoice.find({relations})

    return result
  }

  /**
   * Create a new Invoice
   *
   * @param {PostInvoiceData[]} invoiceData
   * @returns {Invoice}
   */
  create = async (invoiceData: PostInvoiceData[]): Promise<Invoice[] | bodyError> => {
    const invoices: Invoice[] = []

    for (const invoiceD of invoiceData) {
      const {clientId, userId, title, items} = invoiceD

      const {client, user, error} = await this.getClientAndUser(clientId, userId)
      if (error) return error

      const invoiceItems: InvoiceItem[] | bodyError = await this.CreateTransientInvoiceItems(items)
      if (invoiceItems instanceof bodyError) {
        return invoiceItems
      }

      const invoice = await this._repository.invoice.create({title, client, user, status: Status.PENDING, invoiceItems})
      const errors = await validate(invoice)

      if (errors.length) {
        return {error: errors}
      }

      // Saving new Invoice
      invoices.push(await this._repository.invoice.save(invoice))
    }

    return invoices
  }

  /**
   * Create a new Invoice
   *
   * @param {PostInvoiceData[]} invoiceData
   * @returns {Invoice}
   */
   update = async ({invoiceId, clientId, status}: PatchInvoiceData) => {
    const {client, error} = await this.getClientAndUser(clientId)
    if (error) return error

    const invoice = await this._repository.invoice.findOneBy({id: invoiceId, client})

    if (!invoice) {
      return {error: true, message: `Client: ${clientId} doesn't own an Invoice with id: ${invoiceId}`}
    }

    const transientInvoice = new Invoice()
    transientInvoice.status = status
    const errors = await validate(transientInvoice, {skipMissingProperties: true})
    if (errors.length) return {error: errors}

    return await this._repository.invoice.update({id: invoiceId}, {status})
  }

  /**
   * Delete Invoice by Id
   *
   * @param {number} id of the Invoice
   * @returns {Invoice}
   */
   delete = async (id: number): Promise<DeleteResult> => {
    const result = await this._repository.invoice.delete(id)

    return result
  }


  /* --- UTILITIES --- */


  /**
   * Create temporary InvoiceItems to be saved with an Invoice later on
   *
   * @param {DataItem[]} items
   * @returns {Promise<InvoiceItem[] | bodyError>}
   */
  private CreateTransientInvoiceItems = async (items: DataItem[]): Promise<InvoiceItem[] | bodyError> => {
    const invoiceItems: InvoiceItem[] = []

    for (const itemData of items) {
      const item = await this._repository.item.findOneBy({id: itemData.itemId})

      if (!item) {
        return {error: true, message: `Item with id: ${itemData.itemId} doesn't exist`}
      }

      const invoiceItem = await this._repository.invoiceItem.create({
        item,
        quantity: itemData.quantity,
        amount: item.rate * itemData.quantity
      })

      const errors = await validate(invoiceItem)

      if (errors.length) {
        return {error: errors}
      }

      invoiceItems.push(invoiceItem)
    }

    return invoiceItems
  }

  private getClientAndUser = async (clientId?: number, userId?: number) => {
    const client = clientId ? await this._repository.client.findOneBy({id: clientId}) : {}
    const user = clientId ? await this._repository.user.findOneBy({id: userId}) : {}

    if (!client) {
      return {error: {error: true, message: `Client with id: ${clientId} doesn't exist`}}
    }

    if (!user) {
      return {error: {error: true, message: `User with id: ${userId} doesn't exist`}}
    }

    return {client, user}
  }
}

export default new InvoiceService()
