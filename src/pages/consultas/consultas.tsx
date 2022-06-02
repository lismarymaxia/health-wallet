import {
  IonContent,
  IonPage,
  IonProgressBar,
  IonRow,
  IonCol,
  IonSearchbar,
  IonButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components";
import { servicesWh } from "../../servicios/servicios";
import { Card } from "./Card";
import "./consultas.css";

const Consultas: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);

  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useIonViewDidEnter(() => {
    setLoad(true);
    servicesWh
      .get("/controller/consultasback.php", {
        params: {
          op: "consultas",
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
  });

  const pacsearch = useCallback((searc: any) => {
    return function name(params: any) {
      return params?.medico?.toUpperCase().includes(searc.toUpperCase());
    };
  }, []);

  if (load) {
    return (
      <IonPage>
        <Header title="Consultas" isbotton={true} isBuger={false} />
        <IonContent fullscreen>
          <IonProgressBar type="indeterminate" color="success"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }
  console.log(data);
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
            Consultas
          </IonTitle>
          <IonButton
            slot="start"
            routerLink="/app/home"
            color="light"
            fill="clear"
          >
            <IonIcon icon={arrowBackOutline} style={{ color: "black" }} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="searchContainer">
          <IonSearchbar
            value={searchTerm}
            onIonChange={(e) => setSearchTerm(e.detail.value!)}
            placeholder="Buscar..."
            slot="end"
          />
        </div>
        <IonRow>
          <IonCol size="12">
            {data.filter(pacsearch(searchTerm)).map((item: any, index: any) => (
              <Card item={item} key={index} />
            ))}
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Consultas;
/*
routerLink={`/app/consulta/${item.id}/${item.idcentro}`}
*/
