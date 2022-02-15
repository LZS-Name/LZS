require("dotenv").config();

import {
  Application,
  ApplicationInterface,
} from "../../backend/src/models/Application";
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
let applications = application_mock.map((application: ApplicationInterface) => {
  application.approval_date = Date.now();
  return application;
});
Application.insertMany(applications).then(() => {
  mongoose.disconnect();
});
