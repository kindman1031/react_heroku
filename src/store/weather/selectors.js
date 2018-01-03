export function getParams(state) {
  return state.weather.params;
}

export function getWeatherOne(state, id) {
  return state.weather.byId[id];
}

export function getWeather(state) {
  return Object.values(state.weather.byId);
}

export function getPageNumber(state) {
  return state.weather.pageNumber;
}
