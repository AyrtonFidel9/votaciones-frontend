import { createSlice } from "@reduxjs/toolkit";

export const EmptyRecoveryState = {
    habilitado: false,
    numero: '',
    idSocio: 0,
}

export const recoverySlice = createSlice({
    name: 'RecoveryAccount',
    initialState: EmptyRecoveryState,
    reducers:{
        createRecovery: (state, action) => action.payload,
        updateRecovery: (state, action) => ({ ...state, ...action.payload}),
        resetRecovery: () => EmptyRecoveryState,
    }
});

export const { createRecovery, updateRecovery, resetRecovery} = recoverySlice.actions;

export default recoverySlice.reducer;