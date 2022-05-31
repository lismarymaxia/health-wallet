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
const Vacunas: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user);
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
            <IonCardSubtitle>Vacunas</IonCardSubtitle>
            <IonCardTitle>{nombre}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent></IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Vacunas;
