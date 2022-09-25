import { Entity, PrimaryGeneratedColumn, Column, Relation, OneToMany } from "typeorm"
import Invoice from "./Invoice"
import { IsNotEmpty, IsString } from "class-validator"

@Entity()
export default class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoice: Relation<Invoice>
}
