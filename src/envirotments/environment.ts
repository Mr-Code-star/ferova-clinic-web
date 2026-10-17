export const environment = {
  production: true,

  // BASE API URL
  serverBasePath: import.meta.env.NG_APP_BASE_PATH,

  // API URL GOOGLE MAPS
  googleMapsApiUrl: `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.NG_APP_GOOGLE_MAPS_API_KEY}&libraries=visualization`,

  // USERS ENDPOINT PATH
  usersEndpointPath: "/users"

}
