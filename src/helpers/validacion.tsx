export const valEnfermedad = (
  enfermedad: any,
  tratamiento: string,
  frecuencia: string
) => {
  if (enfermedad === null) {
    return { estado: false, msg: "Por favor agregue la enfermedad" };
  } else if (tratamiento === "") {
    return { estado: false, msg: "Por favor agregue un tratamiento" };
  } else if (frecuencia === "") {
    return { estado: false, msg: "Por favor agregue la frecuencia" };
  }
  return { estado: true, msg: "" };
};
