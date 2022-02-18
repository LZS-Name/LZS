require("dotenv").config();
import express, { Application } from "express";
const mongoose = require("mongoose");
const apiRouter = require("./src/controllers");

const app: Application = express();
const port = 3001;

// Database Connection
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", (error: Error) => console.error(error));
// db.once("open", () => console.log("Connected to Database"));
// db.on("disconnected", () =>
//   console.log("Mongoose connection to DB disconnected")
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/", apiRouter);

// try {
//   app.listen(port, (): void => {
//     console.log(`Connected successfully on port ${port}`);
//   });
// } catch (error: any) {
//   console.error(`Error occured: ${error.message}`);
// }

import parseResult from "./src/mock/test.json";

interface StringIndex {
  [key: string]: string;
}

const { documents } = parseResult;
const { fields } = documents[0];
const { family_list_from_MAIS } = fields;
// construct object
let result = Object.keys(fields).reduce(
  (acc, cur) => {
    return { ...acc, [cur]: (fields as any)[cur].value };
  },
  { family_list_from_MAIS: [] as any }
);
// handle table
const table = family_list_from_MAIS.values;
console.log("family_list_from_MAIS.values[0]", table);
const familyListFromMAIS = table.map((row) => {
  return Object.keys(row.properties).reduce((acc, cur) => {
    return { ...acc, [cur]: (row.properties as any)[cur].value };
  }, {});
});
console.log("familyListFromMAIS", familyListFromMAIS);
result.family_list_from_MAIS = familyListFromMAIS;
console.log(result);
console.log(parseResult.apiVersion);
