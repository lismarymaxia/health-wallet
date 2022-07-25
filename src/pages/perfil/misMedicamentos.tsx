import React, { useState } from "react";
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
  IonItem,
  IonButton
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./perfil.css";
import "../../style/tema.css";
import { HeaderPerfil } from "../../components";

const MisMedicamentos = () => { 
    const history = useHistory();
    const handelDetail = () => {
        history.push("/app/detalle-medicamento");
    };
  return (
    <IonPage className="fondo">
      <HeaderPerfil title='Mis medicamentos' />     

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Mi historial de medicamentos
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                <div>
                    <IonImg
                        src="./images/juan.jpg"
                        alt="AAAA"
                        style={{ width: "50px", height: "50px" }}
                        className="float-left mr-2"
                    />       
                    <div className="d-flex justify-content-between">
                        <div className="fs-15 font-w600 text-info mt-1 title">
                            <span className="w-100">AAAA</span>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="mb-0 ml-5 pl-2 pt-1 fs-12">
                    <span className="float-left">
                        BBBBB
                    </span>
                    <IonButton
                        color="dark"
                        className="float-right m-0"
                        style={{ width: "28px", height: "20px" }}
                        fill="clear"
                        onClick={() => {
                        handelDetail();
                        }}
                    >
                        <FontAwesomeIcon
                        icon={faAngleRight}
                        className="mr-0"
                        />
                    </IonButton>
                    </p>
                </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MisMedicamentos;
