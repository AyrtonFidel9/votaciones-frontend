import { PrivateRoutes } from "../../../routes";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SaveIcon from "@mui/icons-material/Save";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";

export default function CamposForm(props) {
  const navigate = useNavigate();
  const {
    cambiarAgencia,
    errors,
    register,
    setValue,
    agencias,
    time,
    day,
    estado,
    agencia,
    setDay,
    setTime,
    setEstado,
    data,
    habBtn,
  } = props;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderRadius: 4,
          padding: 4,
          boxShadow: 3,
        }}
        gap={4}
      >
        <Stack spacing={3} alignItems="stretch" sx={{ width: "50%" }}>
          <TextField
            {...register("nombre", { required: true })}
            id="nombre"
            error={errors.nombre && true}
            label="Nombre"
            variant="outlined"
            helperText={errors.nombre?.message}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Dia"
              value={day}
              inputFormat="DD/MM/YYYY"
              minDate={new Date()}
              onChange={(newValue) => {
                setDay(newValue);
                setValue("dia", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("dia", { required: true })}
                  id="dia"
                  error={errors.dia && true}
                  label="Día"
                  variant="outlined"
                  helperText={errors.dia?.message}
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Hora"
              value={time}
              minTime={dayjs().set("hour", 6)}
              maxTime={dayjs().set("hour", 20)}
              onChange={(newValue) => {
                setTime(newValue);
                setValue("hora", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("hora", { required: true })}
                  id="hora"
                  error={errors.hora && true}
                  label="Hora"
                  variant="outlined"
                  helperText={errors.hora?.message}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            {...register("duracion", { required: true })}
            id="duracion"
            error={errors.duracion && true}
            label="Duración (horas)"
            type="number"
            variant="outlined"
            helperText={errors.duracion?.message}
          />
        </Stack>
        <Stack spacing={3} alignItems="stretch" sx={{ width: "50%" }}>
          <FormControl id="agencia" error={errors.agencia && true}>
            <InputLabel id="agencia">Agencia</InputLabel>
            <Select
              labelId="agencia"
              id="agencia"
              label="Agencia"
              defaultValue={""}
              {...(data.state && { value: agencia })}
              {...register("agencia", { required: true })}
              onChange={cambiarAgencia}
            >
              {agencias.map((agencia) => (
                <MenuItem key={agencia.id} value={agencia.id}>
                  {agencia.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.agencia && (
              <FormHelperText
                error={errors.agencia?.message && true}
                id="agencia"
              >
                {errors.agencia?.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl id="estado" error={errors.estado && true}>
            <InputLabel id="rol">Estado</InputLabel>
            <Select
              defaultValue={""}
              value={estado}
              labelId="estado"
              id="estado"
              label="Estado"
              {...register("estado", { required: true })}
              onChange={(evt) => setEstado(evt.target.value)}
            >
              <MenuItem value="NO-INICIADO">No iniciado</MenuItem>
              <MenuItem value="EN-CURSO">En curso</MenuItem>
              <MenuItem value="IMPUGNADO">Impugnado</MenuItem>
              <MenuItem value="EXITOSO">Exitoso</MenuItem>
              <MenuItem value="NULIDAD">Nulidad</MenuItem>
            </Select>
            <FormHelperText error={errors.estado?.message && true} id="estado">
              {errors.estado?.message}
            </FormHelperText>
          </FormControl>
        </Stack>
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={3}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          loading={habBtn}
          endIcon={<SaveIcon />}
        >
          Guardar
        </LoadingButton>

        <Button
          variant="text"
          onClick={() => navigate(PrivateRoutes.ELECCIONES)}
        >
          Regresar
        </Button>
      </Stack>
    </>
  );
}
