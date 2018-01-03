import { keyBy } from 'lodash';
import axios from 'axios';
import querystring from 'querystring';
import { Observable } from 'rxjs/Observable';
import { push } from 'react-router-redux';

import * as actionTypes from './actionTypes';
import * as weatherActions from './actionCreators';

export function fetchWeatherOne(action$) {
  return action$.ofType(actionTypes.FETCH_ONE)
    .map(action => action.payload)
    .switchMap(id => {
      return Observable.fromPromise(
        axios.get(`https://mbma-api.herokuapp.com/api/weather/${id}`)
      ).map(res => weatherActions.fetchWeatherOneSuccess(res.data));
    });
}

export function fetchWeather(action$) {
  return action$.ofType(actionTypes.FETCH_COLLECTION)
    .map(action => action.payload)
    .switchMap(params => {
      return Observable.fromPromise(
        axios.get(`https://mbma-api.herokuapp.com/api/weather?${querystring.stringify(params)}`)
      ).map(res => weatherActions.fetchWeatherSuccess(res.data, params));
    });
}

export function updateWeather(action$) {
  return action$.ofType(actionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(item => {
      return Observable.merge(
        Observable.fromPromise(
          axios.put(`https://mbma-api.herokuapp.com/api/weather/${item.id}`, item)
        ).map(res => weatherActions.updateWeatherSuccess(res.data)),
        Observable.of(push('/weather'))
      );
    });
}

export function createWeather(action$) {
  return action$.ofType(actionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(weather => {
      return Observable.merge(
        Observable.fromPromise(
          axios.post(`https://mbma-api.herokuapp.com/api/weather/create`, weather)
        ).map(res => weatherActions.createWeatherSuccess(res.data)),
        Observable.of(push('/weather'))
      );
    });
}

export function deleteWeather(action$) {
  return action$.ofType(actionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(item => {
      return Observable.fromPromise(
        axios.get(`https://mbma-api.herokuapp.com/api/weather/delete/${item.id}`)
      ).map(res => weatherActions.deleteWeatherSuccess(item));
    });
}
