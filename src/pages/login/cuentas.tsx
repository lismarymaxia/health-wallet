import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonThumbnail,
  IonImg,
  IonButton,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { servicesWh } from "../../servicios/servicios";
import { storeLocal } from "../../store/action/aut";
import "./cuentas.css";
import "../../style/tema.css";
const Cuentas = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [load, setLoad] = useState<Boolean>(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setLoad(true);
    servicesWh
      .get("/controller/login.php", {
        params: {
          op: "getCuentas",
          id: user.id,
          correo: user.correo,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setData(data.data);
            setLoad(false);
          } else {
            setLoad(false);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [user]);

  const handleClic = (item: any) => {
    let nueva = Object.assign({}, user, item);
    dispatch(storeLocal(nueva));
    history.push("/app/home");
  };
  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <h4 className="font-w700 text-info-dark mb-2">Bienvenido</h4>
              <p className="fs-14 text-info-dark mb-4">
                ¿A qué perfil deseas ingresar?
              </p>
              <div className="d-flex">
                {load ? (
                  "Cargando..."
                ) : data.length > 0 ? (
                  data.map((item: any) => (
                    <IonThumbnail
                      slot="start"
                      className="mr-2"
                      key={item.idpaciente}
                    >
                      <IonImg src={`./images/${item.imagen}`} />
                      <IonLabel>{item.nombre}</IonLabel>
                      <IonButton
                        color="primary"
                        onClick={() => {
                          handleClic(item);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="mr-0 float-right"
                        />
                      </IonButton>
                    </IonThumbnail>
                  ))
                ) : (
                  <IonThumbnail slot="start" className="">
                    registrar
                  </IonThumbnail>
                )}
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Cuentas;
