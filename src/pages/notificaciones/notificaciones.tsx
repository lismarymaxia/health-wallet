import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useState, useCallback } from "react";
import { afiliados } from "../../data";
import "./notificaciones.css";

const Notificaciones = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const pacsearch = useCallback((searc: any) => {
    return function name(params: any) {
      return params.name.toUpperCase().includes(searc.toUpperCase());
    };
  }, []);

  return (
    <IonPage className="page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Afiliados</IonTitle>
          <IonButton
            slot="start"
            routerLink="/app/home"
            color="light"
            fill="clear"
          >
            <IonIcon icon={arrowBackOutline} style={{ color: "black" }} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="content">
        <div className="searchContainer">
          <IonSearchbar
            value={searchTerm}
            onIonChange={(e) => setSearchTerm(e.detail.value!)}
            placeholder="Buscar..."
            slot="end"
          />
        </div>
        <IonList>
          {afiliados.filter(pacsearch(searchTerm)).map((movie: any) => {
            return (
              <IonItem
                id={`employeeItem_${movie.id}`}
                className={`employeeItem animate__animated animate__fadeIn`}
                key={movie.id}
                lines="none"
              >
                <img src={movie.image} alt="employee avatar" />
                <IonLabel>{movie.name}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notificaciones;
