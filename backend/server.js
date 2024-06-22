// require('dotenv').config();
// const http = require("http");
// const app = require('./index.js')
// const server = http.createServer();
// server.listen(3000)


// const express = require('express');
// const app = express();
// const port = 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

require('dotenv').config();
const http = require('http');
const app = require('./index.js');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


