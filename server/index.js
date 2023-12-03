const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const port = 80;

const app = express();
const server = http.createServer(app);
