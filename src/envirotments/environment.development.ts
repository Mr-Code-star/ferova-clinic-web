export const environment = {
  production: false,

  // BASE API URL
  serverBasePath: "http://localhost:5165/api",

  // API URL GOOGLE MAPS
  googleMapsApiUrl: `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.NG_APP_GOOGLE_MAPS_API_KEY}&libraries=visualization`,

  // USERS ENDPOINT PATH
  usersEndpointPath: "/users",

  // ANALYTICS ENDPOINT PATH
  analyticsEndpointPath: "/analytics",

  // COMMUNICATION ENDPOINT PATH
  communicationEndpointPath: "/communication"


}
