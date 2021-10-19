import { combineReducers } from 'redux';
import usersReducer from './users';

const RootReducer = combineReducers({
  usersReducer
});

export default RootReducer;
