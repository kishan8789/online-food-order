const express = require('express');
const router = express.Router();
const { getRestaurants, addRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const { getFoodByRestaurant, addFoodItem, deleteFoodItem } = require('../controllers/foodController'); // deleteFoodItem add kiya
const { auth, admin } = require('../middleware/auth');

// --- PUBLIC ROUTES (Users can see these) ---

// Saare restaurants dekhne ke liye
router.get('/', getRestaurants);

// Kisi specific restaurant ka menu dekhne ke liye
router.get('/:restaurantId/food', getFoodByRestaurant);


// --- ADMIN PROTECTED ROUTES (Sirf Admin access kar sakta hai) ---

// Naya restaurant add karne ke liye
router.post('/', auth, admin, addRestaurant);

// Restaurant delete karne ke liye
router.delete('/:id', auth, admin, deleteRestaurant);

// Kisi restaurant mein naya food item add karne ke liye
router.post('/:restaurantId/food', auth, admin, addFoodItem);

// Food item delete karne ke liye (Ye naya route hai)
router.delete('/food/:id', auth, admin, deleteFoodItem);

module.exports = router;