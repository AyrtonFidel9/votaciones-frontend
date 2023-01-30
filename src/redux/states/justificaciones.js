import { createSlice } from "@reduxjs/toolkit";

export const EmptyJustificacionesState = [];

export const justificacionesSlice = createSlice({
    name: 'Justificaciones',
    initialState: EmptyJustificacionesState,
    reducers: {
        createJustificaciones: (state, action) => {
            return action.payload},
        addJustificaciones: (state, action) => [...state, action.payload],
        removeJustificacion: (state, action) => state.filter( i => i.id !== action.payload),
        resetJustificaciones: () => EmptyJustificacionesState,
    }
});

export const { createJustificaciones, addJustificaciones, removeJustificacion, resetJustificaciones } = justificacionesSlice.actions;


export const actionGetAllJustificaciones = (token) => async (dispatch) => {
    // console.log("llamado");
    // const justificaciones = await getAllJustificaciones(token).then( resp => resp.json());
    // dispatch(createJustificaciones(justificaciones.message));
}


export const actionSetJustificacion = (body, token) => async (dispatch) => {
    // const justificacion = await ingresarJustificacion(body, token);
    // if(justificacion.ok){
    //     const newJustificacion = await justificacion.json();
    //     dispatch(addJustificaciones(newJustificacion.message));
    //     return true;
    // }else{
    //     const resp = await justificacion.json();
    //     return resp.message;
    // }
}

export const actionUpdateJustificacion = (id, body, token) => async (dispatch) => {
    // const updated = await actualizarJustificacion(id, body, token);
    // if(updated.ok){
    //     dispatch(removeJustificacion(id));
    //     const dataUpdated = { ...body, id: id };
    //     dispatch(addJustificaciones(dataUpdated));
    //     return true;
    // }else{
    //     const resp = await updated.json();
    //     return resp.message;
    // }
}

export default justificacionesSlice.reducer;