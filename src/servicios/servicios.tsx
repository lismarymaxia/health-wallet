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
  servicesWh.post("/controller/consultasback.php", form, {
    responseType: "json",
  });
