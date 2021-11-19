const express = require('express');
const { requestHandler } = require('./Controller');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello Worlds!');
});

app.get('/products/:page?/:count?', requestHandler.getProductsList);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
