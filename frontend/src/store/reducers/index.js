import { combineReducers } from 'redux';
import uiReducer from './uiReducer';
import {history} from '../../App'
import { connectRouter } from 'connected-react-router'
import userReducer from './userReducer'
import matchesReducer from './matchesReducer'
import matchDetailReducer from './matchDetailReducer';
import teamsReducer from './teamsReducer'
import { reducer as formReducer } from 'redux-form'
export default combineReducers({
  form: formReducer,
  ui: uiReducer,
  router: connectRouter(history),
  user: userReducer,
  matches: matchesReducer,
  matchDetail: matchDetailReducer,
  teams: teamsReducer
});
