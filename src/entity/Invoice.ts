import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Relation,
  OneToMany,
  BeforeInsert,
  ManyToOne
} from "typeorm"
import { IsString, IsEnum, IsNotEmpty } from "class-validator"
import InvoiceItem from "./InvoiceItem"
import Client from "./Client"
import User from "./User"
import { Status } from "../types"
import { decimalOptions } from "../utils"

const calculateTotalAmount = (items: Partial<InvoiceItem>[]): number => {
  const result =items.reduce((prev, curr) => {
    const prevAmount = prev.amount || 0
    const currAmount = curr.amount || 0

    return {amount:  prevAmount + currAmount}
  }, {amount: 0})

  return result.amount || 0
}


@Entity()
export default class Invoice {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string

  @Column()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status

  @Column({type: 'decimal', ...decimalOptions})
  totalAmount: number

  @ManyToOne(() => User, (user) => user.invoice)
  @IsNotEmpty()
  user: Relation<User>

  @ManyToOne(() => Client, (client) => client.invoice)
  @IsNotEmpty()
  client: Relation<Client>

  @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice, {cascade: true})
  @IsNotEmpty()
  invoiceItems: InvoiceItem[]

  @BeforeInsert()
  createTotalAmount() {
    this.totalAmount = calculateTotalAmount(this.invoiceItems)
  }
}
