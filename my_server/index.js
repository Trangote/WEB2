const express = require("express");
const port = 3000;
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//Enable CORS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Connect DB
const db = require("./config/db");
db.connect();

app.use(express.static(path.join(__dirname, "/images")));

const finalRouter = require("./routes/final.router");
app.use("/", finalRouter);

app.listen(port, () => {
  console.log(`My server listening on port ${port}`);
});
