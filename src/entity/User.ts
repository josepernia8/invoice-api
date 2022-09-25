import { Entity, PrimaryGeneratedColumn, Column, Relation, Index, OneToMany } from "typeorm"
import Invoice from "./Invoice"
import { IsNotEmpty, IsString, } from "class-validator"

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  @IsString()
  firstName: string

  @Column()
  @IsNotEmpty()
  @IsString()
  lastName: string

  @Column({generatedType: 'STORED', asExpression: `"firstName" || ' ' || "lastName"`})
  @Index('fullName_idx', ['firstName', 'lastName'], { unique: true })
  fullName: string

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoice: Relation<Invoice>
}
