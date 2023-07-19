import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authentication,
  getAllAgencias,
  getAllEleccciones,
  getCuenta,
  getUsuarioById,
} from "../../services";
import { useForm } from "react-hook-form";
import { Box, TextField, Button, Input, FormControl } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import {
  LeftPanelLogin,
  LoginTemplate,
  RightPanelLogin,
} from "../../styled-components";
import Alert from "@mui/material/Alert";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { createAccount } from "../../redux/states/cuenta";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../../routes";
import { createUsuario } from "../../redux/states/usuario";
import { createListas } from "../../redux/states/listas";

const schema = yup
  .object({
    usuario: yup.string().required("Campo obligatorio"),
    password: yup.string().required("Campo obligatorio"),
  })
  .required();

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorDesc, setErrorDesc] = useState("");
  const [, setCookies] = useCookies(["token-cookies"]);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const cargarListaAdmin = async (token) => {
    const agenciasList = await getAllAgencias(token);
    if (agenciasList.ok) {
      const data = await agenciasList.json();
      dispatch(createListas({ agencias: data.message }));
    }
  };

  const cargarListaJGE = async (token) => {
    const agencias = await getAllAgencias(token);
    let resp;
    if (agencias.ok) {
      resp = await agencias.json();
    }
    const elecciones = await getAllEleccciones(token);
    if (elecciones.ok) {
      //const data = await elecciones.json();
      dispatch(
        createListas({
          agencias: resp.message,
          //                elecciones: data.message
        })
      );
    }
  };

  const cargarListas = (rol, token) => {
    switch (rol) {
      case "ROLE_ADMIN":
        cargarListaAdmin(token);
        break;
      case "ROLE_JGE":
        cargarListaJGE(token);
        break;
      case "ROLE_SOCIO":
        cargarListaAdmin(token);
        break;
    }
  };

  const procDispatchUsuario = async (decoded, token) => {
    const cuentaUsuario = await getCuenta(decoded.id, token);
    if (cuentaUsuario.ok) {
      const result = await cuentaUsuario.json();
      const idUsuario = result.message.idSocio;
      const usuario = await getUsuarioById(idUsuario, token);
      if (usuario.ok) {
        const data = await usuario.json();
        dispatch(createUsuario(data.message));
      }
    } else {
      const datos = await cuentaUsuario.json();
      setErrorDesc(datos.message);
    }
  };

  const procAdmin = (decoded, token) => {
    procDispatchUsuario(decoded, token);
    cargarListas(decoded.rol, token);
    navigate(PrivateRoutes.INICIO);
  };

  const procSocio = (decoded, token) => {
    procDispatchUsuario(decoded, token);
    cargarListas(decoded.rol, token);
    navigate(PrivateRoutes.PERFIL);
  };

  const procJGE = (decoded, token) => {
    procDispatchUsuario(decoded, token);
    cargarListas(decoded.rol, token);
    navigate(PrivateRoutes.INICIO);
  };

  const redireccionar = (cuenta, token) => {
    switch (cuenta.rol) {
      case "ROLE_ADMIN":
        procAdmin(cuenta, token);
        break;
      case "ROLE_SOCIO":
        procSocio(cuenta, token);
        break;
      case "ROLE_JGE":
        procJGE(cuenta, token);
        break;
      default:
        navigate(PrivateRoutes.INICIO);
        break;
    }
  };

  const login = async (data) => {
    try {
      const result = await authentication(data);
      if (result.ok) {
        const datos = await result.json();
        const token = datos.token;
        const decoded = jwtDecode(token);
        dispatch(createAccount(decoded));
        setCookies("access-token", token, {
          path: "/",
          expires: new Date(decoded.exp * 1000),
        });
        redireccionar(decoded, token);
      } else {
        const datos = await result.json();
        setErrorDesc(datos.message);
      }
    } catch (error) {
      setErrorDesc(error);
    }
  };

  const forgetPassoword = () => {
    navigate(PublicRoutes.INGRESAR_NUMERO);
  };

  return (
    <LoginTemplate>
      <LeftPanelLogin>
        <h1 style={{ margin: "0px", paddingLeft: "20px" }}>Bienvenido</h1>
        <h3
          style={{ margin: "0px", paddingLeft: "20px", paddingBottom: "20px" }}
        >
          al sistema de Votaciones
        </h3>
      </LeftPanelLogin>
      <RightPanelLogin>
        <img
          src={require("./assets/Logo-coop.png")}
          alt="logo de la cooperativa"
        />
        {errorDesc !== "" && (
          <Alert severity="error" sx={{ marginTop: 3, width: "70%" }}>
            {errorDesc}
          </Alert>
        )}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            width: "30vw",
          }}
          noValidate={false}
          autoComplete="on"
          gap={4}
          onSubmit={handleSubmit(login)}
        >
          <TextField
            {...register("usuario", { required: true })}
            id="usuario"
            error={errors.usuario && true}
            label="Usuario"
            variant="standard"
            helperText={errors.usuario?.message}
          />
          <FormControl
            error={errors.password && true}
            variant="standard"
            sx={{
              margin: "8px",
            }}
          >
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input
              {...register("password")}
              id="password"
              error={errors.password && true}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={errors.password && true}>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "70%",
              margin: "20px auto",
            }}
          >
            Iniciar Sesión
          </Button>
        </Box>
        <Button
          variant="text"
          sx={{
            width: "50%",
            margin: "30px auto",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={forgetPassoword}
        >
          ¿Olvido su contraseña?
        </Button>
      </RightPanelLogin>
    </LoginTemplate>
  );
}
