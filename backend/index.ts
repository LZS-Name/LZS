require('dotenv').config()
import express, { Application } from "express";
const mongoose = require('mongoose');
const apiRouter = require('./src/controllers');

const app: Application = express();
const port = 3000;

// Database Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error: Error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
db.on('disconnected', ()=> console.log('Mongoose connection to DB disconnected'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', apiRouter)

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}