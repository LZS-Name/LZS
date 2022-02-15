require("dotenv").config();

import { Application } from "../../backend/src/models/Application";
import application_mock from "../mock_data/application.mock.json";
const mongoose = require("mongoose");

// Database Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error: Error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
db.on("disconnected", () =>
  console.log("Mongoose connection to DB disconnected")
);

//Application
Application.collection.drop();
Application.insertMany(application_mock).then(() => {
  mongoose.disconnect();
});
