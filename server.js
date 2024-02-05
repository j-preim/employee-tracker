const express = require('express');

const routes = require('./routes')

const app = express();

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

// Connect to database
const db = require("./config/connect");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
