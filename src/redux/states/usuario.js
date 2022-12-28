import { createSlice } from "@reduxjs/toolkit";
import { Usuario } from "../../models";

export const EmptyUsuarioState = {
    id: 0,
    nombres: '',
    apellidos: '',
    cedula: '',
    celular: '',
    email: '',
    imagen: '',
    codigo: 0,
    idAgencia: 0,
}

EmptyUsuarioState.propTypes = { ...Usuario };

export const usuarioSlice = createSlice({
    name: 'usuarioStore',
    initialState: EmptyUsuarioState,
    reducers:{
        createUsuario: (state, action) => action.payload,
        updateUsuario: (state, action) => ({ ...state, ...action.payload}),
        resetUsuario: () => EmptyUsuarioState,
    }
});

export const { createUsuario, updateUsuario, resetUsuario} = usuarioSlice.actions;

export default usuarioSlice.reducer;