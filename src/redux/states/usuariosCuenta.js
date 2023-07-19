import { createSlice } from "@reduxjs/toolkit";
import { getUsuariosCuenta } from "../../services";

export const EmptyUsuariosCuentaState = [];

export const usuariosCuentaSlice = createSlice({
  name: "UsuariosCuentaa",
  initialState: EmptyUsuariosCuentaState,
  reducers: {
    createUsuariosCuenta: (state, action) => action.payload,
    resetUsuariosCuenta: () => EmptyUsuariosCuentaState,
  },
});

export const { createUsuariosCuenta, resetUsuariosCuenta } =
  usuariosCuentaSlice.actions;

export const actionGetAllUsuariosCuenta = (token) => async (dispatch) => {
  const rep = await getUsuariosCuenta(token).then((res) => res.json());
  dispatch(createUsuariosCuenta(rep.message));
};

export default usuariosCuentaSlice.reducer;
