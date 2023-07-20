import React from "react";
import { Plantilla } from "../../components";
import { Grid } from "@mui/material";
import { TableJustificaciones } from "./components";
import { PrivateRoutes } from "../../routes";
import { useColumnsJustificacion, useJusSEJoin } from "./custom-hooks";

export default function Justificaciones() {
  const [justificaciones] = useJusSEJoin();
  const [columnsJustificaciones] = useColumnsJustificacion();

  return (
    <Plantilla pagina="Justificaciones">
      <Grid container>
        <TableJustificaciones
          columns={columnsJustificaciones}
          rows={justificaciones}
          activeCheck={false}
          reviewProcRoute={PrivateRoutes.JUSTIFICACIONES_REVIEW}
        />
      </Grid>
    </Plantilla>
  );
}
