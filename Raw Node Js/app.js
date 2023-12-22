const http = require("http");

const student = [
  {
    name: "arifa moni",
    email: "arifamoni@gmail.com",
    dis: "khulna",
    age: 20,
  },
  {
    name: "rohana",
    email: "arifamoni@gmail.com",
    dis: "khulna",
    age: 20,
  },
  {
    name: "Tasmiya",
    email: "arifamoni@gmail.com",
    dis: "Jessore",
    age: 22,
  },
  {
    name: "Rohan",
    email: "rohan@gmail.com",
    dis: "khulna",
    age: 25,
  },
];
function sendResponse(
  res,
  { contentType = "application/json", body = {}, status = 200 }
) {
  res.writeHead(status, { "Content-Type": contentType });
  res.write(JSON.stringify(body));
  res.end();
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    sendResponse(res, { body: { msg: "This is Home route" } });
  } else if (req.url === "/students") {
    sendResponse(res, { body: student });
  } else {
    sendResponse(res, {
      status: 404,
      body: { msg: "404 route dose not exists" },
    });
  }
});

let port = process.env.port || 3000;
server.listen(port, () => {
  console.log(`Server is running on port http:localhost:${port}`);
});
