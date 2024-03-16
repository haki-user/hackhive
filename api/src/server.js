const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

//config env
dotenv.configDotenv();

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  return app;
}
module.exports = { createServer };
