import React, { useEffect } from "react";
import { Button, Grid, Stack } from "@mui/material";
import { Plantilla, DataTable } from "../../../components";
import { PrivateRoutes } from "../../../routes";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionGetAllInscripciones } from "../../../redux/states/inscripciones";
import { useCookies } from "react-cookie";
import { renderStateInscripcion } from "../utils";


export default function ViewSocio() {
	const usuario = useSelector(store => store.usuario);
	const inscripciones = useSelector(store => {
		const inscripcionesBySocio = store.inscripciones.filter(item=>
			item.idSocio === usuario.id
		);		
		if(inscripcionesBySocio.length > 0){
			return inscripcionesBySocio.map(item=>
				({
					id: item.id,
					nombre: item.nombre,
					formulario: item.formulario,
					declaracion: item.declaracion,
					estado: renderStateInscripcion(item.estado),
				})
			);
		}else{
			return [{
				id: '',
				formulario: '',
				declaracion: '',
				estado: '',
			}]
		}
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [cookies] = useCookies(['access-token']);

	useEffect(()=>{
		dispatch(actionGetAllInscripciones(cookies['access-token']));
	},[dispatch]);

	return (
	<Plantilla pagina="Inscripciones">
		<Stack
			direction="row"
			justifyContent="flex-end"
			sx={{
			width: "100%",
			marginBottom: 5,
			marginTop: 4,
			}}
		>
			<Button
			variant="contained"
			endIcon={<AddIcon />}
			onClick={() => navigate(PrivateRoutes.INSCRIPCIONES_CREAR)}
			>
			GENERAR INSCRIPCIÓN
			</Button>
		</Stack>
		<Grid container>
			<DataTable content={inscripciones} />
		</Grid>
	</Plantilla>
	);
}
