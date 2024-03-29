import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { PropTypes } from 'prop-types';
import { Agencia, Cuenta, Usuario } from '../models';
import cuentaSliceReducer from './states/cuenta';
import recoverySliceReducer from './states/recovery';
import usuarioSliceReducer from './states/usuario';
import confirmDeleteSliceReducer from './states/confirmDelete';
import listasSliceReducer from './states/listas';
import eleccionSliceReducer from './states/elecciones';
import representanteSliceReducer from './states/representantes';
import usuariosListSliceReducer from './states/usuariosList';
import usuariosCuentaSliceReducer from './states/usuariosCuenta';
import agenciaSliceReducer from './states/agencia';
import inscripcionesSliceReducer from './states/inscripciones';
import justificacionesSliceReducer from './states/justificaciones';
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
        'listas',
        'elecciones',
        'representantes',
        'usuariosList',
        'usuariosCuenta',
        'agencia',
        'inscripciones',
        'justificaciones',
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
    elecciones: eleccionSliceReducer,
    representantes: representanteSliceReducer,
    usuariosList: usuariosListSliceReducer,
    usuariosCuenta: usuariosCuentaSliceReducer,
    agencia: agenciaSliceReducer,
    inscripciones: inscripcionesSliceReducer,
    justificaciones: justificacionesSliceReducer,
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
    },
    elecciones: [],
    representantes: [],
    usuariosList: [],
    usuariosCuenta: [],
    agencia: Agencia,
    justificaciones: [],
});

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);

export default store;
