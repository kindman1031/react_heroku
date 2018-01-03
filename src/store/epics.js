import { combineEpics } from 'redux-observable';
import { values } from 'lodash';

import * as weatherEpics from './weather/epics';

export default combineEpics(
  ...values(weatherEpics)
);
