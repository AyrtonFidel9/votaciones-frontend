import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { PropTypes } from 'prop-types';
import { Cuenta } from '../models';
import cuentaSliceReducer from './states/cuenta';
import recoverySliceReducer from './states/recovery';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'account',
    ],
    blacklist: [
        'recovery',
    ]
}

const rootReducer = combineReducers({
    account: cuentaSliceReducer,
    recovery: recoverySliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const AppStore = PropTypes.shape({
    account: Cuenta,
    recovery: {
        habilitado: false,
        numero: '',
    }
});

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);

export default store;


/*export default configureStore({
    reducer: {
        account: cuentaSliceReducer,
    },
    middleware: [thunk]
});*/