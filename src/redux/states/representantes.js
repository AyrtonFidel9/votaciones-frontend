import { createSlice } from "@reduxjs/toolkit";
import { deleteRepresentante, getAllRepresentantes, ingresarRepresentante, updateRepresentante } from "../../services";

export const EmptyRepresentanteState = [];

export const representanteSlice = createSlice({
   name: 'Representantes',
   initialState: EmptyRepresentanteState,
   reducers: {
      createRepresentante: (state, action) => action.payload,
      addRepresentante: (state, action) => [...state, action.payload],
      removeRepresentante: (state, action) => state.filter( i => i.id !== action.payload),
      resetRepresentantes: () => EmptyRepresentanteState,
   }
});

export const { createRepresentante, addRepresentante, resetRepresentantes, removeRepresentante } = representanteSlice.actions;

export const actionIngresarRepresentante = (body, token, setAlertMessage) => async (dispatch) => {
   const request = await ingresarRepresentante(body, token);
   if(request.ok){
      const newRepresentante = await request.json();
      setAlertMessage && setAlertMessage( prev => ({
         isView: true,
         titulo: "Proceso terminado satisfactoriamente",
         content: newRepresentante.message,
         count: ++prev.count,
         tipo: 'success',
         variante: 'filled',
      }));
      dispatch(addRepresentante(newRepresentante.datos));
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

export const actionGetAllRepresentantes = (token) => async (dispatch) => {
   const rep = await getAllRepresentantes(token).then(res => res.json());
   dispatch(createRepresentante(rep.message));
}

export const actionDeleteRepresentante = (id, token) => async (dispatch) => {
   const eliminar = await deleteRepresentante(id, token);
   if(eliminar.ok){
      dispatch(removeRepresentante(id));
      return true;
   }else{
      const resp = await eliminar.json();
      return resp.message;
   }
}

export const actionUpdateRepresentante = (id, body, token, setAlertMessage) => async (dispatch) => {
   const updated = await updateRepresentante(id, body, token);
   if(updated.ok){
      setAlertMessage && setAlertMessage( prev => ({
         isView: true,
         titulo: "Proceso terminado satisfactoriamente",
         content: "Representante actualizado con exito",
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

export default representanteSlice.reducer;