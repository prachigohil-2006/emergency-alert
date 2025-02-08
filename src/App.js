// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [location, setLocation] = useState({ lat: null, lon: null });

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lon: position.coords.longitude,
//           });
//         },
//         (error) => alert("Error fetching location.")
//       );
//     } else {
//       alert("Geolocation not supported.");
//     }
//   };

//   const sendEmergencyAlert = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/send-alert", {
//         latitude: location.lat,
//         longitude: location.lon,
//         phoneNumber: "+919876543210",
//       });
//       alert("Emergency alert sent!");
//     } catch (error) {
//       alert("Failed to send alert.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>AI Telehealth Emergency Alert</h1>
//       <button onClick={getLocation}> Get Location</button>
//       {location.lat && <p>Latitude: {location.lat}, Longitude: {location.lon}</p>}
//       <button onClick={sendEmergencyAlert}>Send Emergency Alert</button>
//     </div>
//   );
// };

// export default App;

import React from "react";
import EmergencyButton from "./components/EmergencyButton";
import './App.css'

function App() {
  return (
    <div>
      <h1>AI Telehealth Emergency Alert</h1>
      <EmergencyButton />
    </div>
  );


}

export default App;
