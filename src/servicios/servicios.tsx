import axio from "axios";

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

export const getEnfermedad = (valor: string) =>
  servicesWh.get("/controller/combosback.php", {
    params: { op: "enfermedadescombo", valor: valor },
    responseType: "json",
  });

export const registroUsuario = (form: any) =>
  servicesWh.post("/controller/usuarios.php", form, {
    responseType: "json",
  });

export const serviciosPaciente = (form: any) =>
  servicesWh.post("/controller/pacienteback.php", form, {
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

export const getLaboratorio = (page: any, cedula: any) =>
  servicesWh.get("/api/listado-laboratorio.php", {
    params: {
      op: "timeline_lab",
      page: page,
      cedula: cedula,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getImagenologia = (page: any, cedula: any) =>
  servicesWh.get("/api/listado-imagenologia", {
    params: {
      op: "imagenologia",
      page: page,
      id: cedula,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getConsulta = (page: any, cedula: any) =>
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
