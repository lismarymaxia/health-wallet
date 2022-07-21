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
/*-FUNCIONES-MATRIZ------------------------------*/
export const orderId = (data: any) => {
  return data.sort((a: any, b: any) => b.id - a.id);
};

/*export const removeDuplicado = (data: any) => {
  return data.filter(
    (item: any, index: number) => data.indexOf(item) === index
  );
};*/
export const removeDuplicado = (data: any) => {
  return data.reduce(
    (partial: any, item: any) =>
      partial.includes(item) ? partial : [...partial, item],
    []
  );
};

function removeDuplicates(originalArray: any, prop: string) {
  let newArray = [];
  let lookupObject: any = {};

  for (let i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (let i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

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
/*-TAB------------------------------------------------*/
export const tabActive = (ruta: string, pathname: string) => {
  if (ruta === pathname) {
    return "active";
  } else {
    return "";
  }
};
/*-COMPARTIR---------------------------------------*/
export const compartir = (url: string) => {
  let Navigator: any;
  Navigator = window.navigator;

  if (Navigator && Navigator.share) {
    Navigator.share({
      title: `Comparit estudio`,
      url: url,
    })
      .then(() => console.log("Successful share"))
      .catch((error: string) => console.log("Error sharing", error));
  } else {
    console.log("share not supported");
  }
};
