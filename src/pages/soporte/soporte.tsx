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
  faAngleRight,
  faHospital,
  faShareNodes,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";
import { Header, Boxfull } from "../../components";
import { useHistory } from "react-router";
import "../../style/tema.css";

const Soporte = () => { 

  return (
    <IonPage className="fondo">
      {<Header title="Soporte" isbotton={true} isBuger={false}/>}

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-2 px-3">
            <IonCol size="12" className="pb-3 border-bottom">
              <h5 className="font-w700 fs-15 text-info-dark mb-2">
                Hoy
              </h5>
              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                  <Boxfull title="Turno médico" imageTitle="" iconTop="" fechaTop="20 Jun" horaTop="09:00" 
                    yearTop="" iconTextoUno={faStethoscope} textoUno="Odontología" iconTextoDos={faHospital} 
                    textoDos="CSS - Policlínica Dr. Roberto" iconTextoTres="" textoTres="" iconTextoCuatro="" textoCuatro="" 
                    linkBottomLeft="" linkBottomRight="" textLinkBottomLeft="" textLinkBottomRight="" 
                    ir={true} linkIr="#" tipo="" />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Soporte;
