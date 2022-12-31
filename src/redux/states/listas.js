import { createSlice } from "@reduxjs/toolkit";

export const EmptyListasState = {
    agencias: [],
    socios: [],
    elecciones: [],
}

export const listasSlice = createSlice({
    name: 'ListasAccount',
    initialState: EmptyListasState,
    reducers:{
        createListas: (state, action) => action.payload,
        updateListas: (state, action) => ({ ...state, ...action.payload}),
        resetListas: () => EmptyListasState,
    }
});

export const { createListas, updateListas, resetListas} = listasSlice.actions;

export default listasSlice.reducer;