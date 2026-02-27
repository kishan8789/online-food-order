const Restaurant = require('../models/Restaurant');
const FoodItem = require('../models/Temp');

// Get all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Admin: Add Restaurant
exports.addRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.json(newRestaurant);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Admin: Delete Restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    await FoodItem.deleteMany({ restaurantId: req.params.id }); // Delete associated food
    res.json({ msg: 'Restaurant removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};