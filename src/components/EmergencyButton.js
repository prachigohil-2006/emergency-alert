import React, { useState } from "react";
import axios from "axios";

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

  const sendAlert = async () => {
    if (!location) {
      alert("Get location first!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/send-alert", {
        latitude: location.lat,
        longitude: location.lon,
        phoneNumber: "+919876543210", // Change to actual recipient
      });
      alert("Emergency alert sent!");
      console.log(response.data);
    } catch (error) {
      alert("Failed to send alert.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={getLocation}>📍 Get Location</button>
      {location && <p>Latitude: {location.lat}, Longitude: {location.lon}</p>}
      <button onClick={sendAlert}>🚨 Send Emergency Alert</button>
    </div>
  );
};

export default EmergencyButton;
