import { Entity, PrimaryGeneratedColumn, Column, Relation, OneToMany } from "typeorm"
import InvoiceItem from "./InvoiceItem"
import { IsNotEmpty } from "class-validator"
import { decimalOptions } from "../utils"

@Entity()
export default class Item {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  title: string

  @Column({type: 'decimal', ...decimalOptions})
  @IsNotEmpty()
  rate: number

  @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.item)
  invoiceItem: Relation<InvoiceItem>
}
