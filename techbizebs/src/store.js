import { createStore, combineReducers,applyMiddleware } from "redux";
import userReducer from './recuders/userReducers';
import PO_Reducer from './recuders/PO_Reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  user : userReducer,
   PO: PO_Reducer
})

const persistConfig = {
 key: 'root',
 storage: storage,
 whiteList: ['userReducer','PO_Reducer']
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, {},applyMiddleware(logger));
export const persistor = persistStore(store);