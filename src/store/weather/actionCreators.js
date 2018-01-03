import { keyBy } from 'lodash';
import * as actionTypes from './actionTypes';

export function fetchWeatherOne(payload) {
  return { type: actionTypes.FETCH_ONE, payload };
}

export function fetchWeatherOneSuccess(payload) {
  const byId = { [payload.id]: payload };
  return { type: actionTypes.FETCH_ONE_SUCCESS, payload: { byId } };
}

export function fetchWeather(payload) {
  return { type: actionTypes.FETCH_COLLECTION, payload };
}

export function fetchWeatherSuccess(weather, params) {
  const byId = keyBy(weather, (item) => item.id);
  return { type: actionTypes.FETCH_COLLECTION_SUCCESS, payload: { byId, params } };
}

export function createWeather(payload) {
  return { type: actionTypes.CREATE, payload };
}

export function createWeatherSuccess(payload) {
  return { type: actionTypes.CREATE_SUCCESS, payload };
}

export function updateWeather(payload) {
  return { type: actionTypes.UPDATE, payload };
}

export function updateWeatherSuccess(payload) {
  return { type: actionTypes.UPDATE_SUCCESS, payload };
}

export function deleteWeather(payload) {
  return { type: actionTypes.DELETE, payload };
}

export function deleteWeatherSuccess(payload) {
  return { type: actionTypes.DELETE_SUCCESS, payload };
}

export function setPageNumber(pageNumber) {
  return { type: actionTypes.SETPAGENUMBER, payload: { pageNumber } };
}
