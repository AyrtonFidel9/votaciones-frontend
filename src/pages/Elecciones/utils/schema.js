import * as yup from "yup";

export const schema = yup
  .object({
    nombre: yup.string().required("Campo obligatorio"),
    dia: yup
      .date()
      .typeError("Ingrese una fecha")
      .required("Campo obligatorio"),
    hora: yup
      .date()
      .typeError("Ingrese una hora")
      .required("Campo obligatorio"),
    duracion: yup
      .mixed()
      .test("duracion", "La duración debe ser mayor a 0", (value) => {
        return value && value > 0;
      }),
    estado: yup.string().required("Campo obligatorio"),
    agencia: yup
      .number()
      .typeError("Seleccione una agencia")
      .required("Campo obligatorio"),
  })
  .required();
