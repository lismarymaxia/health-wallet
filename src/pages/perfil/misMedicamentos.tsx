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
import { chevronBackOutline } from "ionicons/icons";

const MisMedicamentos = () => { 
    const history = useHistory();
    const handelDetail = () => {
        history.push("/app/detalle-medicamento");
    };
  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil-sub bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-16 font-w700" style={{paddingLeft:"12%"}} >
                Mis medicamentos
            </IonTitle>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} text="" className="custom-back text-white" />
            </IonButtons>
          </IonToolbar>
          <div className="mx-3 pb-4 text-white">
            <IonThumbnail slot="start" class="float-left mr-3">
              <IonImg src={"./images/perfil.JPG"} />
            </IonThumbnail>

            <span className="font-w500 fs-14 d-block">
              Laura Cristina García
            </span>
            <span className="fs-12">
              Cabeza de familia
            </span>
          </div>
        </div>
      </IonHeader>      

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
