import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
  IonLabel,
  IonProgressBar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components";
import { services } from "../../servicios/servicios";
const Laboratorio: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);

  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    services
      .get("/api.php", {
        params: {
          op: "timeline_lab",
          id: cedula,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            const tratada = JSON.parse(data);
            const claves = Object.keys(tratada);
            const iterar = claves.map((item) => tratada[item]);
            setData(iterar);
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

  if (load) {
    return (
      <IonPage>
        <Header title="Laboratorio" isbotton={true} isBuger={false} />
        <IonContent fullscreen>
          <IonProgressBar type="indeterminate" color="success"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <Header title="Laboratorio" isbotton={true} isBuger={false} />
      <IonContent fullscreen>
        {data.map((item: any, index: any) => (
          <IonCard className="card__consulta card_custon" key={index}>
            <IonCardHeader>
              <IonCardTitle>{item.tipo}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div style={{paddingBottom: "0.2rem"}}>
                <IonLabel style={{ color: "#333333", fontSize: "0.95rem" }}>
                  {item.centro}
                </IonLabel>
              </div>
              <div>
                <IonLabel>
                  Doctor: {item.doctor}
                </IonLabel>
              </div>
              <div>
                <IonLabel>
                  Tipo paciente: {item.tipo_paciente}
                </IonLabel>
              </div>
              <div>
                <IonLabel>
                  Fecha solicitud: {item.fecha_solicitud}
                </IonLabel>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Laboratorio;
