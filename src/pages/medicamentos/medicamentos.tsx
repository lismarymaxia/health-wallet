import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components";
import { services } from "../../servicios/servicios";
const Medicamentos: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);
  console.log(cedula);
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>({
    idconsulta: "",
    ultimavisita: "",
    correo: "",
    cedula: "",
    nombre: "",
    telefono: "",
    celular: "",
    nombremedico: "",
    nombreespecialista: "",
    direccion: "",
    daten: "",
    servicio: "",
    frecuencia: "",
    sexo: "",
    diagnostico: "",
  });
  const {
    idconsulta,
    ultimavisita,
    correo,
    nombre,
    telefono,
    celular,
    nombremedico,
    nombreespecialista,
    direccion,
    daten,
    servicio,
    frecuencia,
    sexo,
    diagnostico,
  } = data;

  useEffect(() => {
    services
      .get("/api.php", {
        params: {
          op: "registro",
          cedula: cedula,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            setData(data);
          } else {
            setLoad(false);
            setData({});
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [cedula]);
  return (
    <IonPage>
      <Header title="Datos del paciente" isbotton={false} isBuger={false} />
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Informacion </IonCardSubtitle>
            <IonCardTitle>{nombre}</IonCardTitle>
          </IonCardHeader>
          {load ? <h1>Cargando</h1> : ""}
          <IonCardContent>
            <p>
              <b>Id consulta:</b>
              {idconsulta}
            </p>
            <p>
              <b>Ultimavisita:</b>
              {ultimavisita}
            </p>
            <p>
              <b>Correo:</b>
              {correo}
            </p>
            <p>
              <b>Télefono:</b>
              {telefono}
            </p>
            <p>
              <b>Celular:</b>
              {celular}
            </p>
            <p>
              <b>Nombre medico:</b>
              {nombremedico}{" "}
            </p>
            <p>
              <b>Nombre especialista:</b>
              {nombreespecialista}
            </p>
            <p>
              <b>Dirección:</b>
              {direccion}
            </p>
            <p>
              <b>Día:</b>
              {daten}
            </p>
            <p>
              <b>Servicio:</b>
              {servicio}
            </p>
            <p>
              <b>Frecuencia:</b>
              {frecuencia}
            </p>
            <p>
              <b>Sexo:</b>
              {sexo}
            </p>
            <p>
              <b>Diagnostico:</b>
              {diagnostico}
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Medicamentos;
