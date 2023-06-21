import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import usersReducer from './reducers/usersRedecer';

export default configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [thunkMiddleware],
});