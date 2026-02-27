const FoodItem = require('../models/FoodItem');


exports.getFoodByRestaurant = async (req, res) => {
  try {
   
    const id = req.params.restaurantId || req.params.id;
    const food = await FoodItem.find({ restaurantId: id });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// 2. Admin: Add Food Item
exports.addFoodItem = async (req, res) => {
  try {
    const id = req.params.restaurantId || req.params.id;
    const { name, image, price } = req.body;

    const newItem = new FoodItem({
      name,
      image,
      price,
      restaurantId: id
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error adding food item', error: err.message });
  }
};

// 3. Admin: Delete Food Item (Extra Marks for this!)
exports.deleteFoodItem = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) return res.status(404).json({ msg: 'Food item not found' });

    await food.deleteOne();
    res.json({ msg: 'Food item removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};