import { createSlice } from "@reduxjs/toolkit";

export const EmptyConfirmDeletedState = {
    idDelete: 0,
}

export const confirmDeletedSlice = createSlice({
    name: 'ConfirmDeleted',
    initialState: EmptyConfirmDeletedState,
    reducers:{
        createConfirmDeleted: (state, action) => action.payload,
        updateConfirmDeleted: (state, action) => ({ ...state, ...action.payload}),
        resetConfirmDeleted: () => EmptyConfirmDeletedState,
    }
});

export const { createConfirmDeleted, updateConfirmDeleted, resetConfirmDeleted} = confirmDeletedSlice.actions;

export default confirmDeletedSlice.reducer;