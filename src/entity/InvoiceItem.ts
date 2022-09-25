import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Relation,
  ManyToOne,
  CreateDateColumn
} from "typeorm"
import Item from "./Item"
import Invoice from "./Invoice"
import { IsDefined, IsNotEmpty, IsInt } from "class-validator"
import { decimalOptions } from "../utils"

@Entity()
export default class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column({default: 0})
  @IsNotEmpty()
  @IsInt()
  quantity: number

  @Column({type: 'decimal', ...decimalOptions})
  @IsNotEmpty()
  amount: number

  @Column({type: 'date'})
  @CreateDateColumn()
  description: Date

  @ManyToOne(() => Item, (item) => item.invoiceItem)
  @IsDefined()
  item: Relation<Item>

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItems)
  invoice: Invoice
}
