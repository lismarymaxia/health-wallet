import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonInput,
  IonText,
  IonItem,
  IonLabel,
  IonIcon
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCamera,
  faHospital,
  faMicrophone,
  faShareNodes,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";
import { Header, Boxfull } from "../../components";
import { useHistory } from "react-router";
import "../../style/tema.css";
import "./soporte.css";

const Soporte = () => { 

  return (
    <IonPage className="fondo">
      {<Header title="Soporte" isbotton={true} isBuger={false}/>}

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pt-3 px-3">
          <IonCard className="m-0 mb-4 msj-chat d-inline float-right">
            <IonCardContent className="p-2">
              <IonText className="font-w500 fs-12 text-gray">
                Hola necesito ayuda.
              </IonText>
            </IonCardContent>
          </IonCard>
          <IonCard className="m-0 mb-4 msj-chat d-inline float-left">
            <IonCardContent className="p-2">
              <IonText className="font-w500 fs-12 text-gray ">
                Buenos días, le habla Katherine de soporte Medirec ¿En que puedo ayudarle?
              </IonText>
            </IonCardContent>
          </IonCard>
        </IonGrid>
      </IonContent>
      <IonFooter className="ion-no-border px-3 mb-1">
        <IonToolbar>
          <IonItem className="input-color-blue">
            <FontAwesomeIcon icon={faCamera} className="mr-2 float-right fs-18 text-info cursor-pointer" />
            <IonInput value="" placeholder="Mensaje..." onIonChange={e => setText(e.detail.value!)}></IonInput>
            <FontAwesomeIcon icon={faMicrophone} className="mr-0 float-right fs-18 text-info cursor-pointer" />
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Soporte;
function setText(arg0: string): void {
  throw new Error("Function not implemented.");
}

