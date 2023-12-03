const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const socket = require("socket.io")(server);
const bodyParser = require("body-parser");

// const PORT = 80;
const PORT = process.env.PORT;
