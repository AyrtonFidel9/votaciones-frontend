import { createSlice } from "@reduxjs/toolkit";
import { Agencia } from "../../models";
import { getAgencia } from "../../services";

export const EmptyAgenciaState = {
	id: 0,
	nombre: '',
	ubicacion: '',
	numRepresentantes: 0,
	numGanadores: 0,
};

EmptyAgenciaState.propTypes = { ...Agencia };


export const agenciaSlice = createSlice({
	name: 'Agencia',
	initialState: EmptyAgenciaState,
	reducers: {
		createAgencia: (state, action) => action.payload,
		addAgencia: (state, action) => [...state, action.payload],
		removeAgencia: (state, action) => state.filter( i => i.id !== action.payload),
		resetAgencia: () => EmptyAgenciaState,
	}
});

export const { createAgencia, addAgencia, resetAgencia, removeAgencia } = agenciaSlice.actions;


export const actionGetAgenciaById = (id, token) => async (dispatch) => {
	const agencias = await getAgencia(id, token).then(resp=>resp.json());
	dispatch(createAgencia(agencias.message));
}



export default agenciaSlice.reducer;