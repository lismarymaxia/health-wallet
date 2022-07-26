import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton,
  IonToast,
  IonLabel,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonList,
  IonToggle,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { storeLocal } from "../../store/action/aut";
import { serviciosPaciente } from "../../servicios";
import { Header } from "../../components";
import { grupoSanguineos, INITIALCREARPERFIL } from "../../helpers";
import { useForm } from "../../hook";
import "../../style/tema.css";

const CitaCrear = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });
  const [checked, setChecked] = useState(false);
  const [form, handleInputChange, handleInputReset] =
    useForm(INITIALCREARPERFIL);

  const handleAdd = () => {
    let discapacidad = checked ? "si" : "no";
    let formDa = new FormData();
    formDa.append("op", "addPaciente");
    formDa.append("idusuario", user.id);
    formDa.append("nombre", form.nombre);
    formDa.append("apellido", form.apellido);
    formDa.append("cedula", form.cedula);
    formDa.append("fechanacimiento", form.fechanacimiento);
    formDa.append("gruposangre", form.gruposangre);
    formDa.append("edad", form.edad);
    formDa.append("discapacidad", discapacidad);
    serviciosPaciente(formDa)
      .then(function (response) {
        const { data, status } = response;
        if (status === 200) {
          if (data.rsp === 1) {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
            let clone = { ...form, idpaciente: data.id, idregex: data.idregex };
            let nueva = Object.assign({}, user, clone);
            dispatch(storeLocal(nueva));
            history.replace("/app/home");
            handleInputReset();
          } else {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
          }
        }
      })
      .catch(function (err) {
        console.warn("Error:" + err);
      });
  };

  return (
    <IonPage className="fondo">
      <Header title="Nueva cita" isbotton={true} isBuger={false} />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-3 px-3 d-none">
            <IonCol size="12" className="pb-2">
              <h5 className="font-w600 fs-16 text-blue-dark">
                Creación de perfil
              </h5>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="px-3 mt-3">
              <IonCard className="m-0 mb-2 pb-2 card-slide">
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="stacked">
                      Nombre <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      name="nombre"
                      value={form.nombre}
                      onIonChange={(e: any) =>
                        handleInputChange(e.detail.value!, "nombre")
                      }
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Apellido <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      value={form.apellido}
                      onIonChange={(e: any) =>
                        handleInputChange(e.detail.value!, "apellido")
                      }
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      N° de documento <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      value={form.cedula}
                      onIonChange={(e: any) =>
                        handleInputChange(e.detail.value!, "cedula")
                      }
                    ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">
                      Fecha de cita <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      type="date"
                      value={form.fechanacimiento}
                      onIonChange={(e: any) =>
                        handleInputChange(e.detail.value!, "fechanacimiento")
                      }
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>              
            </IonCol>
            <IonCol>
              <div className="text-center">
                <IonButton
                  className="border-radius"
                  fill="outline"
                  onClick={handleAdd}
                >
                  Guardar
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonToast
        isOpen={notificacion.estado}
        onDidDismiss={() => setNotificacion({ ...notificacion, estado: false })}
        message={notificacion.msg}
        duration={500}
      />
    </IonPage>
  );
};

export default CitaCrear;
