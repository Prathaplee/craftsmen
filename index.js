require("dotenv").config();
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require('./router/authRoutes');
const errorHandler = require("./middleware/errorhandler");
const schemeRoutes = require('./router/schemeroutes');
const addressRoutes = require('./router/addressroute');
const documentRoutes = require('./router/documentroutes');
const savingsSchemeSubscriber = require("./router/savingsschemesubscriber"); // Import the routes
const profileRoutes = require('./router/profile'); // Adjust the path to your profile.js


const app = express();

// Middleware
app.use(express.json()); // This replaces bodyParser.json()
app.use(cors());
app.use(helmet());

// Route handling
app.use("/api/schemes", schemeRoutes);
app.use("/api/documents", documentRoutes);
app.use('/images', express.static('images'));
// Serve uploaded files (e.g., profile images)
app.use('/uploads', express.static('uploads'));
app.use('/profile', profileRoutes); // Mount the profile routes at /profile


app.use("/addresses", addressRoutes); // This makes all routes in addressRoutes accessible under /addresses
app.use("/api/savings-scheme-subscriber", savingsSchemeSubscriber);


app.use("/api/savings-scheme", savingsSchemeSubscriber);

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route);
  }
});


// MongoDB connection

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection error:", err));

// Authentication routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
