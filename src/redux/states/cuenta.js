import { createSlice } from "@reduxjs/toolkit";
import { Cuenta } from "../../models";

export const EmptyAccountState = {
    id: 0,
    usuario: '',
    rol: '',
}

EmptyAccountState.propTypes = { ...Cuenta };

export const cuentaSlice = createSlice({
    name: 'accountUser',
    initialState: EmptyAccountState,
    reducers:{
        createAccount: (state, action) => action.payload,
        updateAccount: (state, action) => ({ ...state, ...action.payload}),
        resetAccount: () => EmptyAccountState,
    }
});

export const { createAccount, updateAccount, resetAccount} = cuentaSlice.actions;

export default cuentaSlice.reducer;