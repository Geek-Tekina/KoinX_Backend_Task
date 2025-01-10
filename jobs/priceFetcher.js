const axios = require("axios");
const Crypto = require("../models/crypto");

const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,ethereum,matic-network",
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
        },
      }
    );

    const { bitcoin, ethereum, "matic-network": matic } = response.data;

    const cryptos = [
      {
        coin: "bitcoin",
        price: bitcoin.usd,
        marketCap: bitcoin.usd_market_cap,
        change24h: bitcoin.usd_24h_change,
      },
      {
        coin: "ethereum",
        price: ethereum.usd,
        marketCap: ethereum.usd_market_cap,
        change24h: ethereum.usd_24h_change,
      },
      {
        coin: "matic-network",
        price: matic.usd,
        marketCap: matic.usd_market_cap,
        change24h: matic.usd_24h_change,
      },
    ];

    await Crypto.insertMany(cryptos);
    console.log("Crypto data fetched and stored:", new Date().toISOString());
  } catch (error) {
    console.error("Error fetching crypto prices:", error.message);
  }
};

module.exports = fetchCryptoPrices;
