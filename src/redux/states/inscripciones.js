import { createSlice } from "@reduxjs/toolkit";

export const EmptyInscripcionesState = [];

export const inscripcionesSlice = createSlice({
   name: 'Inscripciones',
   initialState: EmptyInscripcionesState,
   reducers: {
      createInscripciones: (state, action) => action.payload,
      updateInscripciones: (state, action) => [...state, action.payload],
      resetInscripciones: () => EmptyInscripcionesState,
   }
});

export const { createInscripciones, updateInscripciones, resetInscripciones } = inscripcionesSlice.actions;


export const actionGetAllInscripciones = (token) => async (dispatch) => {
   // const inscripciones = await getAllEleccciones(token).then(res => res.json());
   // dispatch(createInscripciones(inscripciones.message));
}


export default inscripcionesSlice.reducer;