export const WEATHER_API_URL = function (lat, log) {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=1aeb0eb9a95e2e13b41d7b4b55697950&units=metric`;
  return api;
};

export const QUOTE_API_URL = `https://dummyjson.com/quotes/random`;
