const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YMLJ = require("yamljs");
const swaggerFile = YMLJ.load("./myblog.yml");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./Schema/user");

const app = express();
// File Structure

app.use(express.json());
app.use("/api/v1/test", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/health", (_req, res) => {
  res.status(200).json({ health: "good" });
});
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Home route" });
});

// ================================> Database connectin <=================================
let port = process.env.PORT || 3000;
let connectionString = process.env.MONGO_URI;
connectionString = connectionString.replace(
  "<username>",
  process.env.MONGO_USERNAME
);
connectionString = connectionString.replace(
  "<password>",
  process.env.MONGO_PASSWORD
);
connectionString = `${connectionString}/${process.env.DB_NAME}?${process.env.MONGO_QUERYSTRING}`;

function main() {
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Database connected successfully");

      app.listen(port, async () => {
        console.log(`Server is running on port:http://localhost:${port}`);

        const users = await User.find({});
        console.log(users);
      });
    })
    .catch(() => {
      console.log("Connection faild");
    });
}
main();
