import { meses } from "./tablasHash";

export const handleNombre = (id: any, data: any) => {
  let filter: any = data.filter((item: any) => item.value === id);
  if (filter.length > 0) {
    const [item] = filter;
    return item.label;
  }
};
/*-FECHA---------------------------------------------------*/
export const formtFechaCorta = (fecha: any) => {
  if (fecha != null && fecha !== "") {
    let f = new Date(fecha);
    let nueva = "";
    const [dia, mes, yy] = f.toLocaleDateString().split("/");
    nueva = `${yy}-${mes}-${dia}`;
    return nueva;
  } else {
    return "";
  }
};

export const fechaFrontend = (fecha: any) => {
  let nueva = "";
  if (fecha != null && fecha !== "") {
    let f = new Date(fecha);
    const [dia, mes, yy] = f.toLocaleDateString().split("/");
    nueva = `${dia}-${mes}-${yy}`;
    return nueva;
  } else {
    return nueva;
  }
};

export const fechaImagenologia = (fecha: any) => {
  if (fecha != null && fecha !== "") {
    const [dia, mes, yy] = fecha.split("-");
    return { daymonth: `${dia} ${mes}`, yy: `20${yy}` };
  } else {
    return { daymonth: "", yy: "" };
  }
};

export const fechaLaboratorio = (fecha: any) => {
  if (fecha != null && fecha !== "") {
    const [fch] = fecha.split(" ");
    const [dia, mes, yy] = fch.split("/");
    return { daymonth: `${dia} ${meses[mes]}`, yy: `20${yy}` };
  } else {
    return { daymonth: "", yy: "" };
  }
};

export const fechaActual = () => {
  var fecha = new Date();
  var options: any = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return fecha.toLocaleDateString("es-ES", options);
};
/*-ORDENADO-ID-----------------------------------*/
export const orderId = (data: any) => {
  return data.sort((a: any, b: any) => b.id - a.id);
};

export const cadenaUpercase = (text: string) => {
  let cadena = text.trim().split(" ");
  let formato = cadena
    .map((palabra: any) => {
      palabra = palabra.replaceAll("\u200BPOLICLINICA", "POLICLÍNICA");
      palabra = palabra.replaceAll("Policlinica", "Policlínica");
      palabra = palabra.replaceAll("MEDICO", "MÉDICO");

      return palabra.length <= 2
        ? palabra.toLowerCase()
        : palabra.substring(0, 1).toUpperCase() +
            palabra.substring(1).toLowerCase();
    })
    .join(" ");
  return formato;
};
