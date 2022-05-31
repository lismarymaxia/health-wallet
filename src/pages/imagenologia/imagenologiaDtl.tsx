import {
  IonContent,
  IonPage,
  IonItem,
  IonAvatar,
  IonLabel,
  IonSkeletonText,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components";
import { services } from "../../servicios/servicios";

const ImagenologiaDtls: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);
  const institucion = useSelector(
    (state: any) => state.reducerFuncionalidad.institutcion
  );
  const load = true;

  return (
    <IonPage>
      <Header title={institucion} isbotton={true} isBuger={false} />
      <IonContent fullscreen>
        {load && (
          <div className="ion-padding custom-skeleton">
            <IonSkeletonText animated style={{ width: "60%" }} />
            <IonSkeletonText animated />
            <IonSkeletonText animated style={{ width: "88%" }} />
            <IonSkeletonText animated style={{ width: "70%" }} />
            <IonSkeletonText animated style={{ width: "60%" }} />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ImagenologiaDtls;
