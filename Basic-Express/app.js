const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Hello arifa" });
});

app.get("/students", (req, res) => {
  res.json({ msg: "Hello arifa students" });
  console.log(req.query);
});

let port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
