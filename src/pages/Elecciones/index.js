import React, { useRef } from "react";
import { Grid, Stack } from "@mui/material";
import { DataGridTable, Plantilla, AlertaCustom } from "../../components";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../routes";
import { useColumnsElecciones } from "./custom-hooks/useColumnsElecciones";
import { useElecciones } from "../../custom-hooks";
import { useEliminarEleccion } from "./custom-hooks";

export default function Elecciones() {
  const dialogRef = useRef();
  const navigate = useNavigate();
  const [columnsElecciones] = useColumnsElecciones();
  const [elecciones] = useElecciones();
  const [eliminarEleccion, alertMessage] = useEliminarEleccion();

  const handleOpen = () => {
    dialogRef.current.openDialog();
  };

  return (
    <Plantilla pagina="Elecciones">
      <AlertaCustom alerta={alertMessage} />
      <Grid container>
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
            onClick={() => navigate(PrivateRoutes.ELECCIONES_INGRESAR)}
          >
            Crear eleccion
          </Button>
        </Stack>
        <DataGridTable
          rows={elecciones}
          columns={columnsElecciones}
          activeCheck={false}
          eliminarDato={eliminarEleccion}
          mensaje={"¿Esta seguro/a de eliminar la elección?"}
          dialogRef={dialogRef}
          handleOpen={handleOpen}
          updateProcRoute={PrivateRoutes.ELECCIONES_MODIFICAR}
        />
      </Grid>
    </Plantilla>
  );
}
