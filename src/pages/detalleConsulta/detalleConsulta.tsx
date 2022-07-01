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
  faHospital,
  faLocationDot,
  faPhone,
  faUserDoctor
} from "@fortawesome/free-solid-svg-icons";
import { Header, Boxfull } from "../../components";
import { useHistory } from "react-router";
import "../../style/tema.css";

const DetalleConsulta = () => { 

  return (
    <IonPage className="fondo">
      {<Header title="Consultas" isbotton={true} isBuger={false}/>}

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-2 px-3">
            <IonCol size="12" className="pb-3 border-bottom">
              <h5 className="font-w700 fs-15 text-info-dark mb-2">
                Consulta
              </h5>
              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                  <Boxfull title="Odontología" imageTitle="" iconTop="" fechaTop="20 Jun" horaTop="09:00" yearTop="" 
                    iconTextoUno={faHospital} textoUno="CSS - Policlínica Dr. Roberto" 
                    iconTextoDos={faUserDoctor} textoDos="Dr. Rolando Pacheco" 
                    iconTextoTres={faLocationDot} textoTres="Edificio The Panamá Clinic, Torre B Piso 22, Consultorio 2200" 
                    iconTextoCuatro={faPhone} textoCuatro="(507) 6769-2020" 
                    linkBottomLeft="" linkBottomRight="" textLinkBottomLeft="" textLinkBottomRight="" 
                    ir={false} linkIr="#" tipo="Presencial" />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DetalleConsulta;
