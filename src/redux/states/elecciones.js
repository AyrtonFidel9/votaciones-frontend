import { createSlice } from "@reduxjs/toolkit";
import { deleteEleccion, getAllEleccciones, ingresarElecccion, updateEleccion } from "../../services";

export const EmptyEleccionesState = [];

export const eleccionesSlice = createSlice({
   name: 'Elecciones',
   initialState: EmptyEleccionesState,
   reducers: {
      createElecciones: (state, action) => action.payload,
      addElecciones: (state, action) => [...state, action.payload],
      removeElecciones: (state, action) => state.filter( i => i.id !== action.payload),
      resetElecciones: () => EmptyEleccionesState,
   }
});

export const { createElecciones, addElecciones, resetElecciones, removeElecciones } = eleccionesSlice.actions;

export const actionIngresarEleccion = (body, token, setAlertMessage) => async (dispatch) => {
   const request = await ingresarElecccion(body, token);
   if(request.ok){
      const newEleccion = await request.json();
      setAlertMessage( prev => ({
         isView: true,
         titulo: "Proceso terminado satisfactoriamente",
         content: "Eleccion creada con exito",
         count: ++prev.count,
         tipo: 'success',
         variante: 'filled',
      }));
      dispatch(addElecciones(newEleccion.message));
   }else{
      const resp = await request.json();
      setAlertMessage && setAlertMessage(prev => ({
         isView: true,
         titulo: "Error",
         content: resp.message,
         count: ++prev.count,
         tipo: 'error',
         variante: 'filled',
      }));
   }
}

export const actionGetAllElecciones = (token) => async (dispatch) => {
   const elecciones = await getAllEleccciones(token).then(res => res.json());
   dispatch(createElecciones(elecciones.message));
}

export const actionDeleteElecciones = (id, token, setAlertMessage) => async (dispatch) => {
   const eliminar = await deleteEleccion(id, token);
   if(eliminar.ok){
      setAlertMessage && setAlertMessage( prev => ({
         isView: true,
         titulo: "Proceso terminado satisfactoriamente",
         content: "Elección eliminada con exito",
         count: ++prev.count,
         tipo: 'success',
         variante: 'filled',
      }));
      dispatch(removeElecciones(id));
   }else{
      const resp = await eliminar.json();
      setAlertMessage && setAlertMessage(prev => ({
         isView: true,
         titulo: "Error",
         content: resp.message,
         count: ++prev.count,
         tipo: 'error',
         variante: 'filled',
      }));
   }
}

export const actionUpdateElecciones = (id, body, token, setAlertMessage) => async (dispatch) => {
   const updated = await updateEleccion(id, body, token);
   if(updated.ok){
      setAlertMessage && setAlertMessage( prev => ({
         isView: true,
         titulo: "Proceso terminado satisfactoriamente",
         content: "Elección actualizada con exito",
         count: ++prev.count,
         tipo: 'success',
         variante: 'filled',
      }));

   }else{
      const resp = await updated.json();
      setAlertMessage && setAlertMessage(prev => ({
         isView: true,
         titulo: "Error",
         content: resp.message,
         count: ++prev.count,
         tipo: 'error',
         variante: 'filled',
      }));
   }
}

export default eleccionesSlice.reducer;