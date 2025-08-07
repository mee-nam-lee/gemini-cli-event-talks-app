const express = require('express');
const app = express();
const port = 8080;
const talks = require('./data/talks.json');

app.use(express.static('public'));

app.get('/api/talks', (req, res) => {
  res.json(talks);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});