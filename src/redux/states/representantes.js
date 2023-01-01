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

export const actionIngresarRepresentante = (body, token) => async (dispatch) => {
   const request = await ingresarRepresentante(body, token);
   if(request.ok){
      const newRepresentante = await request.json();
      dispatch(addRepresentante(newRepresentante.datos));
      return true;
   }else{
      const resp = await request.json();
      return resp.message;
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

export const actionUpdateRepresentante = (id, body, token) => async (dispatch) => {
   const updated = await updateRepresentante(id, body, token);
   if(updated.ok){
      dispatch(removeRepresentante(id));
      const dataUpdated = { ...body, id: id};
      dispatch(addRepresentante(dataUpdated));
      return true;
   }else{
      const resp = await updated.json();
      return resp.message;
   }
}

export default representanteSlice.reducer;