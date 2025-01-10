const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cryptoRoutes = require("./routes/cryptoRoutes");
const fetchCryptoPrices = require("./jobs/priceFetcher");
const cron = require("node-cron");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Crypto Price Tracker API",
    routes: {
      stats: "/api/stats?coin=bitcoin",
      deviation: "/api/deviation?coin=bitcoin",
    },
    description:
      "Use /api/stats and /api/deviation endpoints to get crypto data",
  });
});

// Routes
app.use("/api", cryptoRoutes);

// Background Scheduler that runs every 2 hours
cron.schedule("0 */2 * * *", fetchCryptoPrices);

// Initial fetch on startup
fetchCryptoPrices();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
