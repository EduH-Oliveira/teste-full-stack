import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from "./routes/user";
import { database } from "./database";

const app = express()

const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/users", userRoutes);

app.listen(port, async () => {
    try {
        console.log(`server run in port = ${port}`)
        await database.initialize()
        console.log('data base running')
        await database.runMigrations()
        console.log('migrations finished')
    } catch (err) {
        console.log(err)
    }
})