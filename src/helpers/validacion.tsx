export const valEnfermedad = (enfermedad: any) => {
  if (enfermedad === null) {
    return { estado: false, msg: "Por favor agregue la enfermedad" };
  }
  return { estado: true, msg: "" };
};
export const valTratamiento = (
  medicamento: any,
  dosis: number,
  cada: number,
  totaldosis: number,
  fechaInicio: string,
  duracion: number,
  fechaFin: string,
  notas: string
) => {
  if (medicamento === null) {
    return { estado: false, msg: "Por favor agregue el medicamento" };
  } else if (dosis === 0) {
    return { estado: false, msg: "Por favor agregue la dosis" };
  } else if (cada === 0) {
    return { estado: false, msg: "Por favor agregue cada cuantas horas" };
  } else if (totaldosis === 0) {
    return { estado: false, msg: "Por favor agregue las anteriores" };
  } else if (fechaInicio === "") {
    return {
      estado: false,
      msg: "Por favor agregue las fecha en la que se inicia el tratamiento",
    };
  } else if (duracion === 0) {
    return {
      estado: false,
      msg: "Por favor agregue la duracion del tratamiento",
    };
  } else if (fechaFin === "") {
    return {
      estado: false,
      msg: "Por favor agregue las fecha fin del tratamiento",
    };
  }
  return { estado: true, msg: "" };
};
