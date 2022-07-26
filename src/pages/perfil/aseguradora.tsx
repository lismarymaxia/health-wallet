import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import "./perfil.css";
import "../../style/tema.css";
import { HeaderPerfil } from "../../components";

const Aseguradora = () => { 
  return (
    <IonPage className="fondo">
      <HeaderPerfil title='Aseguradora' />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Proveedor de seguro
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                    DATOS DEL PROVEEDOR
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Aseguradora;
