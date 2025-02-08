const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/find-hospitals", async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const response = await axios.get("https://api.maple.com/v1/healthcare/nearby", {
      params: { lat: latitude, lon: longitude },
      headers: { Authorization: `Bearer ${process.env.MAPLE_API_KEY}` },
    });

    res.json({ hospitals: response.data });
  } catch (error) {
    console.error("Maple API Error:", error);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
});

module.exports = router;
