const express = require('express');
const { requestHandler } = require('./Controller');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello Worlds!');
});

app.get('/products/:product_id/related', requestHandler.getRelatedProducts);
app.get('/products/:product_id/styles', requestHandler.getProductStyles);
app.get('/products/:product_id', requestHandler.getProductInformation);
app.get('/products/:page?/:count?', requestHandler.getProductsList);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
