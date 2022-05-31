import {
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonProgressBar,
} from "@ionic/react";
import { linkSharp } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components";
import { services } from "../../servicios/servicios";
import "./imagenologia.css";

const Imagenologia: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);

  /*const institucion = useSelector(
    (state: any) => state.reducerFuncionalidad.institutcion
  );*/
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    services
      .get("/api.php", {
        params: {
          op: "imagenologia",
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
            /*const filtrado = data.data.filter(
              (item: any) => item.unidad === institucion
            );*/
            setData(data.data);
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
        <Header title="Consulta" isbotton={true} isBuger={false} />
        <IonContent fullscreen>
          <IonProgressBar type="indeterminate" color="success"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <Header title="Imagenología" isbotton={true} isBuger={false} />
      <IonContent fullscreen>
        {data.map((item: any, index: any) => (
          <IonCard className="card__consulta card_custon" key={index}>
            <IonCardHeader>
              <IonCardTitle>{item.tipo}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="ion-margin-bottom">
                <h2>
                  <IonLabel style={{ color: "#fff" }}>
                    Unidad:{item.unidad}
                  </IonLabel>
                </h2>
              </div>
              <div className="ion-margin-bottom">
                <h2 className="margin__botton">
                  <IonLabel style={{ color: "#fff" }}>
                    Estudio:{item.estudio}
                  </IonLabel>
                </h2>
              </div>
              <div className="ion-margin-bottom">
                <h3>
                  <IonLabel style={{ color: "#fff" }}>
                    Fecha:{item.fecha}
                  </IonLabel>
                </h3>
              </div>

              <IonButton
                expand="full"
                fill="clear"
                style={{ color: "#fff" }}
                target="_blank"
                href={item.url}
              >
                ver
                <IonIcon
                  icon={linkSharp}
                  className="ion-margin-start"
                  size="small"
                />{" "}
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Imagenologia;
/*
Estudio: US - Abdomen completo(higado,ri?on,bazo,pancreas,via  biliar)
Unidad "Policlínica Dr. Roberto Ramirez de Diego"
fecha: "17-FEB-22"

 {load ? (
          <div className="ion-padding custom-skeleton">
            <IonSkeletonText animated style={{ width: "60%" }} />
            <IonSkeletonText animated />
            <IonSkeletonText animated style={{ width: "88%" }} />
            <IonSkeletonText animated style={{ width: "70%" }} />
            <IonSkeletonText animated style={{ width: "60%" }} />
          </div>
        ) : (
          data.map((item: any, index: any) => (
            <div className="post" key={index}>
              <IonItem lines="none">
                <IonAvatar className="content__button">
                  <IonButton
                    fill="clear"
                    style={{
                      background: "#148f77",
                      color: "#ffff",
                      width: "3.5rem",
                      height: "3.5rem",
                      borderRadius: "50%",
                    }}
                    routerLink="/app/imagenologia-detalle"
                  >
                    <IonIcon icon={documentTextSharp} />
                  </IonButton>
                </IonAvatar>
                <IonLabel className="ion-text-wrap">
                  <div className="postInfo">
                    <p>Fecha:{item.fecha}</p>
                  </div>
                  <div className="postInfo">
                    <p>Estudio:{item.estudio}</p>
                  </div>
                  <div className="postInfo">
                    <p>Estado:{item.estado}</p>
                  </div>

                  <p className="postText"></p>
                  <div className="postReactions">
                    <div className="postReaction">
                      <p></p>
                    </div>
                  </div>
                </IonLabel>
              </IonItem>
            </div>
          ))
        )}
*/
