const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const socket = require("socket.io")(server);
const bodyParser = require("body-parser");

// const PORT = 80;
const PORT = process.env.PORT;

// const liveCart;

console.log(`POS system server running on port: ${PORT}`);

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlEncoded({ extended: false }));

// ROUTES
app.all("/*", function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.get("/", function (req, res) {
  res.send("POS systems a go");
});

app.use("/api/inventory", require("./api/inventory"));
app.use("/api/transactions", require("./api/transactions"));
