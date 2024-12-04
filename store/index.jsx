import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import kullanici from './kullaniciSlice';
import gorevler from './goverlerSlice';

const rootReducer = combineReducers({
  kullanici,
  gorevler,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export {store};
