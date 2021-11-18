const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:2700/Products') //

const ProductsSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [{
    feature: String,
    value: String
  }]
})

const Products = mongoose.model('Products', ProductsSchema);

const StylesSchema = new mongoose.Schema({
  product_id: Number,
  results: [
    {
      style_id: Number,
      name: String,
      original_price: Number,
      sale_price: Number,
      default?: Boolean, //look into resolving ? issue
      photos: [{
        thumnail_url: String,
        url: String
      }],
      skus: {
        number: { //look into this
          quantity: Number,
          size: String
        }
      }
    }
  ]
})

const Styles = mongoose.model('Styles', StylesSchema);

const RelatedItemsSchema = new mongoose.Schema({
  product_id: String,
  related_items: []
})

const RelatedItems = mongoose.model('RelatedItems', RelatedItemsSchema);
