const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var productsSchema = new Schema({
    name: String,
    price: String,
    quantity: String,
    catagory:String
});

var Products = mongoose.model('products', productsSchema);

module.exports = Products;