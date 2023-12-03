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

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlEncoded({ extended: false }));
