import {
  filterNombre,
  formtFechaCorta,
  fechaFrontend,
  fechaImagenologia,
  fechaLaboratorio,
  fechaActual,
  fechaPerfil,
  orderId,
  removeDuplicado,
  cadenaUpercase,
  tabActive,
  compartir,
} from "./helpers";
import {
  tablaFrecuencia,
  meses,
  grupoSanguineos,
  grupodiscapacidad,
} from "./tablasHash";
import { INITIALPERFIL, SLIDEOPTS, INITIALCREARPERFIL, NOTAB } from "./const";
export {
  /*-HELPERS-----------------------*/
  filterNombre,
  formtFechaCorta,
  fechaFrontend,
  fechaActual,
  fechaImagenologia,
  fechaLaboratorio,
  fechaPerfil,
  orderId,
  removeDuplicado,
  cadenaUpercase,
  tabActive,
  compartir,
  /*-TABLA-HASH------------------*/
  meses,
  tablaFrecuencia,
  grupoSanguineos,
  grupodiscapacidad,
  /*-CONSTANTES-----------------*/
  INITIALPERFIL,
  SLIDEOPTS,
  INITIALCREARPERFIL,
  NOTAB,
};
