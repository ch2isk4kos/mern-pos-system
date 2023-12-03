const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);
const bodyParser = require("body-parser");

// const PORT = 80;
const PORT = process.env.PORT;

let liveCart;

console.log(`POS system running`);

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

// Home
app.get("/", function (req, res) {
  res.send("POS systems a go");
});

app.use("/api/inventory", require("./api/inventory"));
app.use("/api/transactions", require("./api/transactions"));

// WEB SOCKET
io.on("connection", function (socket) {
  // on page load, show user current cart
  socket.on("cart-transaction-complete", function () {
    socket.broadcast.emit("update-live-cart-display", {});
  });
  // when client connected, make client update live cart
  socket.on("live-cart-page-loaded", function () {
    socket.emit("update-live-cart-display", liveCart);
  });
  // when the cart data is updated by the POS
  socket.emit("update-live-cart-display", liveCart);
  // keep track of it
  socket.on("update-live-cart", function (cartData) {
    liveCart = cartData; // broadcast updated live cart to all websocket clients
    socket.broadcast.emit("update-live-cart-display", liveCart);
  });
});

server.listen(port, () =>
  console.log(`POS system server listening on port: ${PORT}`)
);
