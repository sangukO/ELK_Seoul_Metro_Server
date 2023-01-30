const { Client } = require("@elastic/elasticsearch");
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: process.env.ES_USERNAME,
    password: process.env.ES_PASSWORD
  },
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});

module.exports = client;