import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonThumbnail,
  IonImg,
  IonLabel,
  IonSlides,
  IonSlide,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faSliders,
  faAngleRight,
  faHospitalUser,
} from "@fortawesome/free-solid-svg-icons";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { servicesWh } from "../../servicios/servicios";
import "./perfil.css";
import "../../style/tema.css";
const Perfiles = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const history = useHistory();
  const [perfil, setPerfil] = useState({ sangre: "", numemerg: "" });
  useEffect(() => {
    servicesWh
      .get("/controller/pacienteback.php", {
        params: {
          op: "getPacienteId",
          id: user.id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setPerfil({ sangre: data.sangre, numemerg: data.numemerg });
          } else {
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [user]);

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
                <h4 className="font-w700 text-info-dark mb-2">
                Bienvenido
                </h4>
                <p className="fs-14 text-info-dark mb-4">
                ¿A que perfil deseas ingresar?
                </p>
                <div className="float-left">
                    <IonThumbnail slot="start" class="">
                        <IonImg src={"./images/perfil.JPG"} />
                    </IonThumbnail>
                    <IonThumbnail slot="start" class="">
                        <IonImg src={"./images/juan.jpg"} />
                    </IonThumbnail>
                </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfiles;
