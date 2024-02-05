const express = require('express');

const routes = require('./routes')

const app = express();

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Express is now up and running on http://localhost:${PORT}`)
});
