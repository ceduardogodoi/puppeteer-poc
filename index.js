const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const { main } = require('./puppeteer');

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const { email, pass } = req.body;

  let names = [];

  if (email && pass) {
    names = await main(email, pass);
  }

  res.json(names);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
