import { createSlice } from "@reduxjs/toolkit";
import { actualizarUsuario, deleteUsuario, getAllUsuarios, ingresarUsuario } from "../../services";

export const EmptyUsuariosListState = [];

export const usuariosListSlice = createSlice({
   name: 'UsuariosLista',
   initialState: EmptyUsuariosListState,
   reducers: {
      createUsuariosList: (state, action) => action.payload,
      addUsuariosList: (state, action) => [...state, action.payload],
      removeUsuariosList: (state, action) => state.filter( i => i.id !== action.payload),
      resetUsuariosList: () => EmptyUsuariosListState,
   }
});

export const { createUsuariosList, addUsuariosList, resetUsuariosList, removeUsuariosList } = usuariosListSlice.actions;

export const actionIngresarUsuariosList = (body, token, setAlertMessage) => async (dispatch) => {
   const request = await ingresarUsuario(body, token);
   if(request.ok){
      const newUsuario = await request.json();
      setAlertMessage && setAlertMessage( prev => ({
         isView: true,
         titulo: "Proceso terminado satisfactoriamente",
         content: "Usuario creado con exito",
         count: ++prev.count,
         tipo: 'success',
         variante: 'filled',
      }));
      dispatch(addUsuariosList(newUsuario.message));
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

export const actionGetAllUsuariosList = (token) => async (dispatch) => {
   const rep = await getAllUsuarios(token).then(res => res.json());
   dispatch(createUsuariosList(rep.message));
}

export const actionDeleteUsuarioList = (id, token, setAlertMessage) => async (dispatch) => {
   const eliminar = await deleteUsuario(id, token);
   if(eliminar.ok){
      dispatch(removeUsuariosList(id));
      setAlertMessage && setAlertMessage( prev => ({
         isView: true,
         titulo: "Proceso terminado satisfactoriamente",
         content: "Usuario eliminado con exito",
         count: ++prev.count,
         tipo: 'success',
         variante: 'filled',
      }));
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

export const actionUpdateUsuariosList = (id, body, token, setAlertMessage) => async (dispatch) => {
   const updated = await actualizarUsuario(id, body, token);
   if(updated.ok){
      setAlertMessage && setAlertMessage( prev => ({
         isView: true,
         titulo: "Proceso terminado satisfactoriamente",
         content: "Usuario actualizado con exito",
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

export default usuariosListSlice.reducer;