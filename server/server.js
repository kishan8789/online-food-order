require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // 1. Path module yahan import kiya
const connectDB = require('./config/db.js');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// --- API ROUTES --- 
// (Ye hamesha upar hone chahiye)
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/restaurants', require('./routes/restaurantRoutes.js'));

// --- DEPLOYMENT CODE FOR RENDER ---
// 1. Vite React build folder (dist) ko static serve karna
app.use(express.static(path.join(__dirname, '../client/dist')));

// 2. Agar user kisi bhi frontend route (jaise /cart ya /home) par jaye, toh React ka index.html load ho
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// -----------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));