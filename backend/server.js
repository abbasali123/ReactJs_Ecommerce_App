const express = require("express");

import data from "./data";
import dotenv from "dotenv";
import config from "./config";

const userRoute = require("./route/createUserRoute");
const productRoute = require("./route/createProductRoute");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

dotenv.config();
const mongodburl = config.MONGODB_URL;

mongoose
  .connect(mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    useCreateIndex: true,
  })
  .catch((error) => console.log(error));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,PATCH,GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

// app.get("/api/products/:id", (req, res, next) => {
//   const productId = req.params.id;
//   const product = data.products.find((x) => x._id === productId);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).json({
//       error: "Product not found",
//     });
//   }
// });

// app.get("/api/products", (req, res, next) => {
//   res.send(data.products);
// });

app.listen(5000, () => {
  console.log("Server is running");
});
