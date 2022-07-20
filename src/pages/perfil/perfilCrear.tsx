import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { servicesWh } from "../../servicios/servicios";
import "./perfil.css";
import "../../style/tema.css";
const PerfilCrear = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const history = useHistory();

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <h4 className="font-w700 text-info-dark mb-2">REGISTRO DE NUEVO PERFIL</h4>
              
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PerfilCrear;
