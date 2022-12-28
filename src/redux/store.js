import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { PropTypes } from 'prop-types';
import { Cuenta, Usuario } from '../models';
import cuentaSliceReducer from './states/cuenta';
import recoverySliceReducer from './states/recovery';
import usuarioSliceReducer from './states/usuario';
import confirmDeleteSliceReducer from './states/confirmDelete';
import listasSliceReducer from './states/listas';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2, 
    whitelist: [
        'account',
        'usuario',
        'listas'
    ],
    blacklist: [
        'recovery',
        'confirmDeleted'
    ]
}

const rootReducer = combineReducers({
    account: cuentaSliceReducer,
    recovery: recoverySliceReducer,
    usuario: usuarioSliceReducer,
    confirmDeleted: confirmDeleteSliceReducer,
    listas: listasSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const AppStore = PropTypes.shape({
    account: Cuenta,
    recovery: {
        habilitado: false,
        numero: '',
    },
    usuario: Usuario,
    confirmDeleted: {
        idDelete: 0
    },
    listas: {
        agencias: [],
        usuario: [],
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