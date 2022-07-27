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
} from "@ionic/react";
import "./perfilTratamientos.css";
import "../../style/tema.css";
import { HeaderPerfil } from "../../components";

const PerfilTratamientos = () => {
  return (
    <IonPage className="fondo">
      <HeaderPerfil title='Tratamientos activos' />

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

              <IonCard
                className="m-0 mb-3 card-slide shadow-full"
                style={{ height: "auto" }}
              >
                <IonCardContent className="card-content-slide">
                  <div className="text-info fs-15 font-w600 mb-2">
                    <span>Gastritis crónica, no especificada</span>
                  </div>
                  <div>
                    <span className="fs-12 mb-4 d-block">
                      Paracetamol (Acetaminofen) 500mg, tableta. 1 cada 6 horas
                      durante 5 días
                    </span>
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

              <IonCard
                className="m-0 mb-3 pb-3 mt-2 card-slide shadow-full"
                style={{ height: "auto" }}
              >
                <IonCardContent className="card-content-slidex">
                  <div className="text-info fs-15 font-w600 mb-2">
                    <span>Asma</span>
                  </div>
                  <div className="float-left">
                    <span className="fs-12 d-block">Medicina</span>
                    <span className="fs-13 font-w600 mb-4 d-block">
                      Seretide
                    </span>
                    <span className="fs-12 font-w600 d-block">Diagnóstico</span>
                    <span className="fs-12 mb-2">05 May 2005</span>
                  </div>
                  <div className="float-right">
                    <span className="fs-12 d-block">Recordatorio</span>
                    <span className="fs-13 font-w600 mb-4 d-block">
                      1 Puf diario
                    </span>
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
