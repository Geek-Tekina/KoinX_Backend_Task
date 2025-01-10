const express = require("express");
const Crypto = require("../models/crypto");
const { calculateStandardDeviation } = require("../utils/mathUtils");
const router = express.Router();

router.get("/stats", async (req, res) => {
  const { coin } = req.query;

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ createdAt: -1 });
    if (!latestData)
      return res.status(404).json({ error: "No data found for this coin" });

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/deviation", async (req, res) => {
  const { coin } = req.query;

  try {
    const data = await Crypto.find({ coin })
      .sort({ createdAt: -1 })
      .limit(100)
      .select("price");
    // console.log(data);
    if (!data.length)
      return res.status(404).json({ error: "No data found for this coin" });

    const prices = data.map((record) => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
