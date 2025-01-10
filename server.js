const express = require("express");

const app = express();
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the KoinX Backend task ",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});