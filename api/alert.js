const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const twilioClient = require("../config/twilio");

// 🚨 API to Send Emergency Alert via Twilio & Find Nearby Hospitals
router.post("/send-alert", async (req, res) => {
  const { latitude, longitude, phoneNumber } = req.body;

  try {
    // Step 1: Find Nearest Hospital using MapmyIndia API
    const hospitalResponse = await axios.get(
      `https://atlas.mappls.com/api/places/nearby/json`,
      {
        params: {
          keywords: "hospital",
          refLocation: `${latitude},${longitude}`,
          max: 3,
        },
        headers: { Authorization: `Bearer ${process.env.MAPMYINDIA_ACCESS_TOKEN}` },
      }
    );

    const nearestHospital = hospitalResponse.data.suggestedLocations[0];

    // Step 2: Send SMS Alert using Twilio
    const message = await twilioClient.messages.create({
      body: `🚨 Emergency Alert! A high-risk patient needs help at https://maps.mapmyindia.com/?lat=${latitude}&lng=${longitude}. Nearest hospital: ${nearestHospital.placeName}, ${nearestHospital.address}.`,
      from: process.env.TWILIO_PHONE,
      to: phoneNumber,
    });

    res.json({
      success: true,
      message: "Emergency alert sent.",
      hospital: nearestHospital,
      sms_sid: message.sid,
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error);
    res.status(500).json({ error: "Failed to send emergency alert." });
  }
});

module.exports = router;
