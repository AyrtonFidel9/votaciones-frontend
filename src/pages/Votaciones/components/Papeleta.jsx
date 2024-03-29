import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import PerfilPapeleta from "./PerfilPapeleta";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { AnularBtn, SeleccionarBtn, InputRadio } from "../styled-components";
import { urlService } from "../../../services/config";

export default function Papeleta({
  representante,
  psuplente,
  ssuplente,
  imgRep,
  imgPS,
  imgSS,
  idElecciones,
  register,
  idRepresentante,
  setValue,
}) {
  const inputRadioRef = useRef();
  const { ref, ...rest } = register("representantes");

  return (
    <label htmlFor={idRepresentante}>
      <InputRadio
        type="radio"
        name="representantes"
        hidden
        id={idRepresentante}
        ref={(e) => {
          ref(e);
          inputRadioRef.current = e;
        }}
        value={JSON.stringify({
          idElecciones,
          idRepresentante,
        })}
        {...rest}
      />
      <Card sx={{ minWidth: 300, marginBottom: 7, marginRight: 3 }}>
        <CardMedia
          component="img"
          height="100"
          image={`${urlService}/images/${imgRep}`}
          sx={{
            width: 100,
            margin: "10px auto 0px",
          }}
        />
        <CardContent
          sx={{
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Representante
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              paddingBottom: 2,
            }}
          >
            {representante}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }} align="left">
            Primer Suplente
          </Typography>
          <PerfilPapeleta
            img={`${urlService}/images/${imgPS}`}
            nombreCompleto={psuplente}
          />
          <Typography variant="body1" sx={{ fontWeight: "bold" }} align="left">
            Segundo Suplente
          </Typography>
          <PerfilPapeleta
            img={`${urlService}/images/${imgSS}`}
            nombreCompleto={ssuplente}
          />
        </CardContent>
        <CardActions
          sx={{
            marginBottom: 1,
            display: "block",
          }}
        >
          <SeleccionarBtn
            variant="contained"
            size="medium"
            endIcon={<CheckCircleOutlineIcon />}
            type="button"
            onClick={() => {
              inputRadioRef.current.checked = true;
              setValue(
                "representantes",
                JSON.stringify({
                  idElecciones,
                  idRepresentante,
                })
              );
            }}
          >
            Seleccionar
          </SeleccionarBtn>
          <AnularBtn
            variant="contained"
            size="medium"
            color="warning"
            endIcon={<CloseIcon />}
            type="button"
            onClick={() => {
              inputRadioRef.current.checked = false;
              setValue("representantes", undefined);
            }}
          >
            Anular
          </AnularBtn>
        </CardActions>
      </Card>
    </label>
  );
}
