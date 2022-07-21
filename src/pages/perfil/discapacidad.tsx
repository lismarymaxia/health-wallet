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
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faUserDoctor,
  faSliders,
  faCircle
} from "@fortawesome/free-solid-svg-icons";
import { Header, Boxfull } from "../../components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./perfil.css";
import "../../style/tema.css";
import { chevronBackOutline } from "ionicons/icons";

const Discapacidad = () => { 
  return (
    <IonPage className="fondo">     
      <IonHeader>
        <div className="p-perfil-sub bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-16 font-w700" style={{paddingLeft:"12%"}} >
              Discapacidad
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
              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                  <span className="font-w600 fs-14 text-info-dark">
                    ¿Posee alguna discapacidad?
                  </span>
                  <IonList>
                    <IonItem>
                      <IonSelect interface="action-sheet" placeholder="Seleccionar" className="w-100">
                        <IonSelectOption value="Auditiva">Auditiva</IonSelectOption>
                        <IonSelectOption value="Intelectual">Intelectual</IonSelectOption>
                        <IonSelectOption value="Física">Física</IonSelectOption>
                        <IonSelectOption value="Mental">Mental</IonSelectOption>
                        <IonSelectOption value="Visual">Visual</IonSelectOption>
                        <IonSelectOption value="Visceral">Visceral</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
              <div className="mt-2 ml-1 fs-12 text-underline text-info cursor-pointer">Cargar carnet de SENADIS</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Discapacidad;
