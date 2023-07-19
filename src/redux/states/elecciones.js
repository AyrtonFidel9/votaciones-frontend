import { createSlice } from "@reduxjs/toolkit";
import {
  deleteEleccion,
  getAllEleccciones,
  ingresarElecccion,
  updateEleccion,
} from "../../services";

export const EmptyEleccionesState = [];

export const eleccionesSlice = createSlice({
  name: "Elecciones",
  initialState: EmptyEleccionesState,
  reducers: {
    createElecciones: (state, action) => action.payload,
    addElecciones: (state, action) => [...state, action.payload],
    removeElecciones: (state, action) =>
      state.filter((i) => i.id !== action.payload),
    resetElecciones: () => EmptyEleccionesState,
  },
});

export const {
  createElecciones,
  addElecciones,
  resetElecciones,
  removeElecciones,
} = eleccionesSlice.actions;

export const actionIngresarEleccion = (body, token) => async (dispatch) => {
  const request = await ingresarElecccion(body, token);
  if (request.ok) {
    const newEleccion = await request.json();
    dispatch(addElecciones(newEleccion.message));
    return true;
  } else {
    const resp = await request.json();
    return resp.message;
  }
};

export const actionGetAllElecciones = (token) => async (dispatch) => {
  const elecciones = await getAllEleccciones(token).then((res) => res.json());
  dispatch(createElecciones(elecciones.message));
};

export const actionDeleteElecciones = (id, token) => async (dispatch) => {
  const eliminar = await deleteEleccion(id, token);
  if (eliminar.ok) {
    dispatch(removeElecciones(id));
    return true;
  } else {
    const resp = await eliminar.json();
    return resp.message;
  }
};

export const actionUpdateElecciones = (id, body, token) => async (dispatch) => {
  const updated = await updateEleccion(id, body, token);
  if (updated.ok) {
    dispatch(removeElecciones(id));
    const dataUpdated = { ...body, id: id };
    dispatch(addElecciones(dataUpdated));
    return true;
  } else {
    const resp = await updated.json();
    return resp.message;
  }
};

export default eleccionesSlice.reducer;
