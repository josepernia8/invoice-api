import "reflect-metadata"
import { DataSource } from "typeorm"
import { Client, Invoice, InvoiceItem, Item, User } from "./entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    // host: "localhost", // Comment line below and uncomment this one if you are not using docker
    host: "db", // Docker Service Name
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "invoice_db",
    synchronize: true,
    logging: false,
    entities: [User, Client, Item, InvoiceItem, Invoice],
    migrations: [],
    subscribers: [],
})
