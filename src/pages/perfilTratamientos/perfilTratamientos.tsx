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
  faHospital,
  faUserDoctor,
  faSliders
} from "@fortawesome/free-solid-svg-icons";
import { Header, Boxfull } from "../../components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./perfilTratamientos.css";
import "../../style/tema.css";
import { chevronBackOutline } from "ionicons/icons";

const PerfilTratamientos = () => { 

  return (
    <IonPage className="fondo">     
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-16 font-w700" style={{paddingLeft:"12%"}} >
              Tratamientos activos
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
                    Tratamiento transitorio
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                <div className="text-info fs-15 font-w600 mb-2">
                  <span>Gastritis crónica, no especificada</span>                  
                </div>
                <div>
                  <span className="fs-12 mb-4 d-block">Paracetamol (Acetaminofen) 500mg, tableta. 1 cada 6 horas durante 5 días</span>
                  <span className="fs-12 font-w600 d-block">Diagnóstico</span>
                  <span className="fs-12 mb-2">05 May 2005</span>
                </div>
                </IonCardContent>
              </IonCard>

              <IonRow className="mt-4">
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Tratamiento permanente
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 pb-3 mt-2 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slidex">
                  <div className="text-info fs-15 font-w600 mb-2">
                    <span>Asma</span>                  
                  </div>
                  <div className="float-left">
                    <span className="fs-12 d-block">Medicina</span>
                    <span className="fs-13 font-w600 mb-4 d-block">Seretide</span>
                    <span className="fs-12 font-w600 d-block">Diagnóstico</span>
                    <span className="fs-12 mb-2">05 May 2005</span>
                  </div>
                  <div className="float-right">
                    <span className="fs-12 d-block">Recordatorio</span>
                    <span className="fs-13 font-w600 mb-4 d-block">1 Puf diario</span>
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

export default PerfilTratamientos;
