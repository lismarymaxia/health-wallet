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
  IonImg
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./perfil.css";
import "../../style/tema.css";
import { chevronBackOutline } from "ionicons/icons";

const ContactoEmergencia = () => { 
  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil-sub bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-16 font-w700" style={{paddingLeft:"12%"}} >
              Contacto de emergencia
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
                    Contacto de emergencias
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                    <div className="w-100 pb-1">
                        <div className="fs-12">
                            <FontAwesomeIcon icon={faUserPlus} className="text-info-dark mr-2" /> 
                            Seleccionar de mi lista de contactos
                        </div>
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

export default ContactoEmergencia;
