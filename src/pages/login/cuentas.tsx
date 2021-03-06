import { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { servicesWh } from "../../servicios/servicios";
import { storeLocal } from "../../store/action/aut";
import { imgPerfil } from "../../helpers";
import "./cuentas.css";
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
    history.replace("/app/home");
  };
  const handelNuevoPerfil = () => {
    history.push("/app/cuenta-crear");
  };
  return (
    <IonPage className="fondo__cuentas">
      <IonContent fullscreen>
        <IonGrid className="pb-4 text-white">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <p className="font-w700 text-white mt-3 mb-0 fs-32">Bienvenido</p>
              <p className="fs-20">¿A qué perfil deseas ingresar?</p>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            {load
              ? "Cargando..."
              : data.length > 0
              ? data.map((item: any, index: number) => (
                  <IonCol
                    className="p-2 p-perfil"
                    key={index}
                    onClick={() => {
                      handleClic(item);
                    }}
                  >
                    <div className="box-perfiles cursor-pointer">
                      <img
                        src={imgPerfil(item.imagen, item.idpaciente)}
                        className="mb-2"
                        alt={item.imagen}
                      />
                      <IonLabel className="fs-13">{item.nombre}</IonLabel>
                    </div>
                  </IonCol>
                ))
              : null}
            <IonCol className="p-2 p-perfil">
              <div
                className="box-perfiles cursor-pointer"
                onClick={handelNuevoPerfil}
              >
                <img
                  src={`./images/nuevo-usuario.jpg`}
                  className="mb-2"
                  alt="nuevo"
                />
                <IonLabel className="fs-13">Crear nuevo perfil</IonLabel>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Cuentas;
