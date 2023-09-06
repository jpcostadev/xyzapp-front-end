// GeolocationService.js
import { Promise } from "es6-promise"; // Importe o objeto Promise

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => reject(error),
      );
    } else {
      reject(new Error("Geolocalização não está disponível no seu navegador."));
    }
  });
};
