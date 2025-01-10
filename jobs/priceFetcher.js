const axios = require("axios");

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
    console.log("Coins Fetched - ", bitcoin, ethereum, matic);
    console.log("Crypto data fetched and stored:", new Date().toISOString());
  } catch (error) {
    console.error("Error fetching crypto prices:", error.message);
  }
};

fetchCryptoPrices();
