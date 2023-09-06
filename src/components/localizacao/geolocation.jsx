// GeolocationApp.jsx
import React, { useEffect, useState } from "react";
import { getLocation } from "./geolocationservice";

function GeolocationApp() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocation()
      .then((coords) => {
        setLocation(coords);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [location]);

  return (
    <div>
      {location ? (
        <div>
          <h2>Sua localização:</h2>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>Obtendo localização...</p>
      )}
    </div>
  );
}

export default GeolocationApp;
