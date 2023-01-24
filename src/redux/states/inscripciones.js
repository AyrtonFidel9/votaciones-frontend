import { createSlice } from "@reduxjs/toolkit";
import { actualizarInscripcion, getAllInscripciones, ingresarInscripcion } from "../../services";

export const EmptyInscripcionesState = [];

export const inscripcionesSlice = createSlice({
   name: 'Inscripciones',
   initialState: EmptyInscripcionesState,
   reducers: {
      createInscripciones: (state, action) => {
         return action.payload},
      addInscripciones: (state, action) => [...state, action.payload],
      removeInscripcion: (state, action) => state.filter( i => i.id !== action.payload),
      resetInscripciones: () => EmptyInscripcionesState,
   }
});

export const { createInscripciones, addInscripciones, removeInscripcion, resetInscripciones } = inscripcionesSlice.actions;


export const actionGetAllInscripciones = (token) => async (dispatch) => {
   console.log("llamado");
   const inscripciones = await getAllInscripciones(token).then( resp => resp.json());
   dispatch(createInscripciones(inscripciones.message));
}


export const actionSetInscripcion = (body, token) => async (dispatch) => {
   const inscripcion = await ingresarInscripcion(body, token);
   if(inscripcion.ok){
      const newInscripcion = await inscripcion.json();
      dispatch(addInscripciones(newInscripcion.message));
      return true;
   }else{
      const resp = await inscripcion.json();
      return resp.message;
   }
}

export const actionUpdateInscripcion = (id, body, token) => async (dispatch) => {
   const updated = await actualizarInscripcion(id, body, token);
   if(updated.ok){
      dispatch(removeInscripcion(id));
      const dataUpdated = { ...body, id: id };
      dispatch(addInscripciones(dataUpdated));
      return true;
   }else{
      const resp = await updated.json();
      return resp.message;
   }
}

export default inscripcionesSlice.reducer;