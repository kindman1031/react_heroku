import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth/reducer';
import weather from './weather/reducer';

export default combineReducers({
  auth,
  weather,
  routing: routerReducer,
});
