const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);