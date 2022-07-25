import {
  IonContent,
  IonPage,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonProgressBar,
  IonRow,
  IonCol,
  IonButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
import { servicesWh } from "../../servicios/servicios";

import "./consultas.css";

const Consulta: React.FC = () => {
  const idregex = useSelector((state: any) => state.reducerAuth.user.idregex);
  let { idcnst, idcntr }: any = useParams();
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [tramientos, setTratamientos] = useState<any>([]);
  const [detail, setDetail] = useState<any>({});

  useEffect(() => {
    setLoad(true);
    servicesWh
      .get("/controller/consultasback.php", {
        params: {
          op: "listados",
          idcentro: idcntr,
          idconsulta: idcnst,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data.data) {
            setLoad(false);
            setData(data.data);
          } else {
            setLoad(false);
            setData([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });

    servicesWh
      .get("/controller/consultasback.php", {
        params: {
          op: "reggeneraldata",
          idcentro: idcntr,
          idconsulta: idcnst,
          idregex: idregex,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data.data) {
            setDetail(data.data);
          } else {
            setDetail({});
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });

    servicesWh
      .get("/controller/consultasback.php", {
        params: {
          op: "getTratamiento",
          idconsulta: idcnst,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data?.data) {
            setTratamientos(data.data);
          } else {
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [idcnst, idcntr, idregex]);

  if (load) {
    return (
      <IonPage>
        <Header title="Consulta" isbotton={true} isBuger={false} />
        <IonContent fullscreen>
          <IonProgressBar type="indeterminate" color="success"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage className="page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle
            style={{
              color: "#293f76",
              fontSize: "18px",
            }}
          >
            Consulta
          </IonTitle>
          <IonButton
            slot="start"
            routerLink="/app/consultas"
            color="light"
            fill="clear"
          >
            <IonIcon icon={arrowBackOutline} style={{ color: "black" }} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow>
          <IonCol size="12">
            <IonCard className="card__consulta card_custon">
              <IonCardHeader>
                <IonCardTitle></IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="ion-margin-bottom">
                  <b>Razón de la consulta:</b>
                  {detail.motivovisita}
                </div>
                <div>Lista de afecciones o diagnósticos</div>
                {data.map((item: any) => (
                  <div key={item.id}>
                    <ul className="content__frecuencia">
                      <li className="item__frecuencia active">Primera vez</li>
                      <li className="item__frecuencia">Subsecuente</li>
                      <li className="item__frecuencia">Orient.Diagnóstica</li>
                    </ul>
                    <div>
                      <IonLabel>{item.text}</IonLabel>
                    </div>
                  </div>
                ))}
                <div className="ion-margin-top">
                  <b>Recomendaciones asociadas al diagnóstico:</b>
                  {detail.observacionesdiagnosticos}
                </div>

                <div className="ion-margin-top">Tratamientos</div>
                {tramientos.map((item: any, index: any) => (
                  <div key={index}>
                    <div>{item.textmedicamento}</div>
                    <div>
                      Desde:{item.fechaini}
                      Hasta:{item.fechafin}
                    </div>
                    <div>
                      {item.dosis} cada:{item.cadah}
                      Duracion:{item.duracion}
                    </div>
                  </div>
                ))}
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Consulta;
