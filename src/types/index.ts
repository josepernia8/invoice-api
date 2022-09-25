import { ValidationError } from "class-validator"
import { Repository } from "typeorm"
import { Client, Invoice, InvoiceItem, Item, User } from "../entity"

enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED'
}

interface RepoList {
  client: Repository<Client>
  user: Repository<User>
  item: Repository<Item>
  invoiceItem: Repository<InvoiceItem>
  invoice: Repository<Invoice>
}

type DataItem = {
  itemId: number
  quantity: number
}

interface PostInvoiceData {
  clientId: number
  userId: number
  title: string
  items: DataItem[]
}

interface PatchInvoiceData {
  invoiceId: number
  clientId: number
  status: Status
}

class bodyError {
  error: boolean | ValidationError[]
  message?: string
}

export {Status, RepoList, DataItem, PostInvoiceData, PatchInvoiceData, bodyError}
