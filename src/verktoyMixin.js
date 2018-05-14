export const verktoyMixin = {
  data() {
    return {
      testStreng: 'Hallo'
    };
  },
  methods: {
    getPreciseLocation() {
      var geo = navigator.geolocation;
      return new Promise(function(resolve, reject) {
        geo.getCurrentPosition(function(position) {
          resolve([position.coords.latitude, position.coords.longitude]);
        });
      });
    },
   showError() {
       switch(error.code) {
           case error.PERMISSION_DENIED:
               console.log("User denied the request for Geolocation.")
               break;
           case error.POSITION_UNAVAILABLE:
               console.log("Location information is unavailable.");
               break;
           case error.TIMEOUT:
               console.log("The request to get user location timed out.");
               break;
           case error.UNKNOWN_ERROR:
               console.log(x.innerHTML = "An unknown error occurred.");
               break;
       }
   }
  }
}
