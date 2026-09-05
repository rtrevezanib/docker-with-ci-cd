const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Docker API is running!"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});