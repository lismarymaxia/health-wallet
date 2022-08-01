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
  totalDosisTratamiento,
  fechaDiaAdd,
  imgPerfil,
} from "./helpers";
import {
  tablaFrecuencia,
  meses,
  grupoSanguineos,
  grupodiscapacidad,
} from "./tablasHash";
import {
  INITIALPERFIL,
  SLIDEOPTS,
  INITIALCREARPERFIL,
  NOTAB,
  FORMTRATAMIENTOS,
  INITIALIMAGENOLOGIA,
  INITIALLABORATORIO,
} from "./const";
import { valEnfermedad, valTratamiento } from "./validacion";
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
  totalDosisTratamiento,
  fechaDiaAdd,
  imgPerfil,
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
  FORMTRATAMIENTOS,
  INITIALIMAGENOLOGIA,
  INITIALLABORATORIO,
  /*-VALIDACIONES---------------*/
  valEnfermedad,
  valTratamiento,
};
