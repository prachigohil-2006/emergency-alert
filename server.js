require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const alertRoutes = require("./api/alert");

app.use("/api", alertRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

import React, { useState } from "react";

const EmergencyButton = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => alert("Failed to get location.")
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={getLocation}>📍 Get Location</button>

      {location && (
        <>
          <p>Latitude: {location.lat}, Longitude: {location.lon}</p>
          <a
            href={`https://maps.mapmyindia.com/hospitals/near/${location.lat},${location.lon}`}
            target="_blank"
            rel="noopener noreferrer"
          >
             Get Directions to Nearest Hospital
          </a>
        </>
      )}
    </div>
  );
};

