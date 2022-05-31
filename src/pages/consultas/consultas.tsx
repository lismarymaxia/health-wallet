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
  IonSearchbar,
  IonButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components";
import { services } from "../../servicios/servicios";
//import doctor from "../../asset/doctor.png";
import "./consultas.css";

const Consultas: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);

  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Optional parameters to pass to the swiper instance.
  // See https://swiperjs.com/swiper-api for valid options.

  useEffect(() => {
    setLoad(true);
    services
      .get("/api.php", {
        params: {
          op: "consultas",
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
  }, [cedula]);

  const search = (e: any) => {
    const searchTermVal = e.currentTarget.value;

    if (searchTermVal !== "") {
      const searchTermLower = searchTermVal.toLowerCase();
      setSearchTerm(searchTermLower);
      const filtrado = data.filter((item: any) => {
        return item.medico.toLowerCase().includes(searchTermLower);
      });
      setData(filtrado);
    } else {
      setSearchTerm("");
    }
  };

  const handleClear = () => {
    setData(data);
  };

  const pacsearch = useCallback((searc: any) => {
    return function name(params: any) {
      return params.medico.toUpperCase().includes(searc.toUpperCase());
    };
  }, []);

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
              <IonCard className="card__consulta card_custon" key={index}>
                <IonCardHeader>
                  <IonCardTitle>{item.tipo}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div>
                    <IonLabel>
                      Medico: {item.medico}
                    </IonLabel>
                  </div>
                  <div>
                    <IonLabel>
                      Fecha: {item.fecha} {item.hora}
                    </IonLabel>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Consultas;

/*
data.map((item: any, index: any) => (
          <div className="post" key={index}>
            <IonItem lines="none">
              <IonAvatar className="postAvatar">
                <img src={doctor} alt="" />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">
                <div className="postInfo">
                  <p>Medico:{item.medico}</p>
                </div>
                <div className="postInfo">
                  <p>Fecha:{item.fecha}</p>
                  <p></p>
                </div>

                <p className="postText"></p>
                <div className="postReactions">
                  <div className="postReaction"></div>
                </div>
              </IonLabel>
            </IonItem>
          </div>
))
*/
