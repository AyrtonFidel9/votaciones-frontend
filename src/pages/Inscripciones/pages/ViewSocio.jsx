import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Plantilla, DataTable } from "../../../components";
import ChipTable from "../../../components/DataGridTable/ChipTable";
import usuariosData from "../../../__mocks__/socios.json";
import { PrivateRoutes } from "../../../routes";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";


export default function ViewSocio() {

	const navigate = useNavigate();

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
         	onClick={() => navigate(PrivateRoutes.AGENCIA_INGRESAR)}
			>
         	GENERAR INSCRIPCIÓN
         </Button>
      </Stack>
		<Grid container>
			<DataTable content={usuariosData} />
		</Grid>
   	</Plantilla>
	);
}
