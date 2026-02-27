require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const FoodItem = require('./models/FoodItem');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // 1. Purana data saaf karein
    await Restaurant.deleteMany({});
    await FoodItem.deleteMany({});

    // 2. Restaurants ka Data
    const restaurantData = [
      { name: "Pizza Hut", description: "Authentic Italian pizzas and pasta.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
      { name: "Burger King", description: "Home of the Whopper, flame-grilled to perfection.", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add" },
      { name: "KFC", description: "Finger lickin' good fried chicken and buckets.", image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb" },
      { name: "Dominos", description: "Hot & fresh pizza delivered in 30 minutes.", image: "https://images.unsplash.com/photo-1594000199163-2629382ec5b5" },
      { name: "Starbucks", description: "Premium coffee, teas, and quick delicious bites.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
      { name: "Haldiram", description: "Traditional Indian snacks, sweets, and meals.", image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6" },
      { name: "Subway", description: "Build your own fresh sandwiches and salads.", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845" },
      { name: "Baskin Robbins", description: "World's favorite ice cream with 31 flavors.", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f" }
    ];

    // Restaurants ko save karein aur unki IDs le lein
    const createdRestaurants = await Restaurant.insertMany(restaurantData);
    console.log(`✅ ${createdRestaurants.length} Restaurants Added!`);

    // 3. Sabhi Restaurants ke liye Food Items ka loop
    const allFoodItems = [];

    createdRestaurants.forEach(rest => {
      // Har restaurant mein 3-4 items add karte hain
      allFoodItems.push(
        {
          name: `${rest.name} Special Combo`,
          price: 499,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
          restaurantId: rest._id
        },
        {
          name: "Classic Delight",
          price: 199,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
          restaurantId: rest._id
        },
        {
          name: "Family Feast",
          price: 899,
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
          restaurantId: rest._id
        }
      );
    });

    await FoodItem.insertMany(allFoodItems);
    console.log(`✅ ${allFoodItems.length} Food Items Added!`);

    console.log("🚀 Database Seeded Successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error Seeding:", err);
    process.exit(1);
  }
};

seedData();