import axio from "axios";

export const URLPERFIL =
  "https://toolkit.maxialatam.com/wallethealth/asset/perfiles/";

export const services = axio.create({
  baseURL: "https://toolkit.maxialatam.com/portalcss/api/",
});

export const servicesWh = axio.create({
  baseURL: "https://toolkit.maxialatam.com/wallethealth/",
});

export const authentication = (form: any) =>
  servicesWh.post("/controller/login.php", form, {
    responseType: "json",
  });

export const getPost = (page: any) =>
  servicesWh.get("https://maxialatam.com/conectadoss/wp-json/wp/v2/posts?", {
    headers: {
      Authorization: "Basic cmVkc29jaWFsOk1heGlhMzIxKg==",
      "Content-Type": "application/json",
    },
    params: {
      page: page,
      per_page: 6,
    },
    responseType: "json",
  });

export const registroUsuario = (form: any) =>
  servicesWh.post("/controller/usuarios.php", form, {
    responseType: "json",
  });

export const serviciosAfiliados = (form: any) =>
  servicesWh.post("/controller/afiliados.php", form, {
    responseType: "json",
  });

export const serviciosConsultas = (form: any) =>
  servicesWh.post("/api/listado-consultas.php", form, {
    responseType: "json",
  });

export const getLaboratorio = (idafiliado: any, page: any, cedula: any) =>
  servicesWh.get("/api/listado-laboratorio.php", {
    params: {
      op: "timeline_lab",
      page: page,
      cedula: cedula,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getImagenologia = (idafiliado: any, page: any, cedula: any) =>
  servicesWh.get("/api/listado-imagenologia", {
    params: {
      op: "imagenologia",
      page: page,
      id: cedula,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getConsulta = (idafiliado: any, page: any, cedula: any) =>
  servicesWh.get("/api/listado-consultas.php", {
    params: {
      op: "consultas",
      cedula: cedula,
      page: page,
      busqueda: "",
      desde: "",
      hasta: "",
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
/*-PACIENTES----------------------------------------------*/
export const getPerfil = (idusuario: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getPerfil",
      id: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getPerfilEdicion = (idusuario: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getPerfilEdicion",
      id: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getPerfiles = (idusuario: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getPerfiles",
      id: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const serviciosPaciente = (form: any) =>
  servicesWh.post("/controller/pacienteback.php", form, {
    responseType: "json",
  });

export const getFichaCompleta = (idusuario: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getFichaCompleta",
      id: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
/*-ALERGIAS----------------------------------------------*/
export const getAlergiasPaciente = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getAlergias",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getGrupoAlergias = () =>
  servicesWh.get("/controller/combosback.php", {
    params: {
      op: "gruposdealergias",
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getAlergias = (idgrupo: any) =>
  servicesWh.get("/controller/combosback.php", {
    params: {
      op: "alergias",
      idgrupo: idgrupo,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
/*-ENFERMEDAD----------------------------------------*/
export const getEnfermedadPaciente = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getEnfermedades",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getEnfermedad = (valor: string) =>
  servicesWh.get("/controller/combosback.php", {
    params: { op: "enfermedadescombo", valor: valor },
    responseType: "json",
  });
/*-TRATAMIENTO---------------------------------------*/
export const getMedicamentos = (valor: string) =>
  servicesWh.get("/controller/combosback.php", {
    params: { op: "getMedicamentos", valor: valor },
    responseType: "json",
  });

export const getTratamientosPacientes = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getTratamientos",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getTipoDiagnosticosPacientes = (id: any, tipo: string) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getTipoDiagnostico",
      id: id,
      idtipo: tipo,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
/*-DISCAPACIDAD--------------------------------------*/
export const getDicapacidadPaciente = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getDiscapacidad",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
/*-MIS-MEDICAMENTOS------------------------------*/
export const getMisMedicamentos = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getMisMedicamentos",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
