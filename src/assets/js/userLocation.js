export function getUserLocation() {
    return new Promise((resolve, reject) => {
      // Check if the browser supports geolocation
      if ('geolocation' in navigator) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve(userLocation);
          },
          (error) => {
            reject(`Error getting location: ${error.message}`);
          }
        );
      } else {
        reject('Geolocation is not supported by your browser.');
      }
    });
  }

