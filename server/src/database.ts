import { DataSource } from 'typeorm'
import entities from "./entities"

export const database = new DataSource({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: "teste-db",
    entities: entities,
    logging: true,
    migrations: [__dirname + "/migrations/*.ts"]
})