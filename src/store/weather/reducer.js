import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
  byId: {},
  params: {},
  pageNumber: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ONE_SUCCESS:
    case actionTypes.FETCH_COLLECTION_SUCCESS:
      return state.merge({
        params: action.payload.params || {},
        byId: action.payload.byId || {}
      });
    case actionTypes.CREATE_SUCCESS:
    case actionTypes.UPDATE_SUCCESS:
      return state.setIn(['byId', action.payload.id], action.payload);
    case actionTypes.DELETE_SUCCESS:
      return state.set('byId', state.byId.without(action.payload.id));
    case actionTypes.SETPAGENUMBER:
      return state.set('pageNumber', action.payload.pageNumber);
    default:
      return state;
  }
};
