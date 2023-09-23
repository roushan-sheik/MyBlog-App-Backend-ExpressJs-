const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        name: "arifa",
        email: "arifa@gmail.com",
        districk: "Khulna ",
      })
    );
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        msg: "Resource not found",
      })
    );
    res.end();
  }
});

let port = process.env.port || 3000;

server.listen(port, () => {
  console.log(`Server is running on port:http://localhost:${port}`);
});
