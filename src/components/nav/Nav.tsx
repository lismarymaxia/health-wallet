import React, { useEffect } from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import { peopleSharp, logOutSharp } from "ionicons/icons";
import { useHistory } from "react-router";
import { logout } from "../../store/action/aut";
import { useDispatch, useSelector } from "react-redux";
export const Nav: React.FC = () => {
  const isAuth: any = useSelector<any>((state) => state.reducerAuth.stdAuth);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isAuth) {
      history.replace("/");
    }
  }, [history, isAuth]);

  const handelLogout = (e: any) => {
    dispatch(logout());
  };

  return (
    <IonMenu side="start" contentId="navApp" className="menu__fondo">
      <IonHeader>
        <IonToolbar>
          <IonTitle
            style={{
              color: "#293f76",
              fontSize: "18px",
            }}
          >
            Health Wallet
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonListHeader
            style={{
              color: "#ffffff",
              fontSize: "18px",
              background: "#293f76",
            }}
          >
            <IonLabel style={{marginTop: "0px"}}>Menú Principal</IonLabel>
          </IonListHeader>
          {/*<IonItem routerLink="/app/datos" onClick={close}>
            <IonIcon color="black" slot="start" icon={personSharp}></IonIcon>
            <IonLabel>Datos</IonLabel>
          </IonItem>
         <IonItem lines="none" routerLink="/app/consulta" onClick={close}>
            <IonIcon color="black" slot="start" icon={pulseSharp}></IonIcon>
            <IonLabel>Consultas</IonLabel>
          </IonItem>

          <IonItem lines="none" routerLink="/app/imagenologia" onClick={close}>
            <IonIcon
              color="black"
              slot="start"
              icon={alertCircleSharp}
            ></IonIcon>
            <IonLabel>Imagenología</IonLabel>
          </IonItem>
          <IonItem lines="none" routerLink="/app/laboratorio" onClick={close}>
            <IonIcon color="black" slot="start" icon={archiveSharp}></IonIcon>
            <IonLabel>Laboratorio</IonLabel>
          </IonItem>
          <IonItem lines="none" onClick={close}>
            <IonIcon color="black" slot="start" icon={heartSharp}></IonIcon>
            <IonLabel> Registro de Vacunación</IonLabel>
          </IonItem>
          <IonItem lines="none" onClick={close}>
            <IonIcon color="black" slot="start" icon={receiptSharp}></IonIcon>
            <IonLabel>Medicamentos por Tratatamientos</IonLabel>
          </IonItem>*/}
          <IonItem routerLink="/app/afiliados">
            <IonIcon color="black" slot="start" icon={peopleSharp}></IonIcon>
            <IonLabel>Afiliados</IonLabel>
          </IonItem>
          <IonItem lines="none" onClick={handelLogout}>
            <IonIcon color="black" slot="start" icon={logOutSharp}></IonIcon>
            <IonLabel>Cerrar sesión</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
