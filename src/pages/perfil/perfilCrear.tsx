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
import "./perfil.css";

const PerfilCrear = () => {
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
    formDa.append("cedula", form.documento);
    formDa.append("fechanacimiento", form.nacimiento);
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
      <Header title="Nuevo dependiente" isbotton={true} isBuger={false} />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-3 px-3">
            <IonCol size="12" className="pb-2">
              <h5 className="font-w600 fs-16 text-blue-dark">
                Creación de perfil
              </h5>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="px-3">
              <IonCard className="m-0 mb-2 pb-2 card-slide">
                <IonCardContent>
                  <div className="text-center subir-perfil">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="cursor-pointer text-info fs-18"
                    />
                  </div>

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
                      value={form.documento}
                      onIonChange={(e: any) =>
                        handleInputChange(e.detail.value!, "documento")
                      }
                    ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">
                      Fecha de nacimiento <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      type="date"
                      value={form.nacimiento}
                      onIonChange={(e: any) =>
                        handleInputChange(e.detail.value!, "nacimiento")
                      }
                    ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Edad</IonLabel>
                    <IonInput
                      value={form.edad}
                      onIonChange={(e: any) =>
                        handleInputChange(e.detail.value!, "edad")
                      }
                    ></IonInput>
                  </IonItem>

                  <IonList>
                    <IonItem>
                      <IonLabel position="stacked">
                        Grupo sanguíneo <span className="text-danger">*</span>
                      </IonLabel>
                      <IonSelect
                        interface="action-sheet"
                        placeholder="Tipo"
                        value={form.gruposangre}
                        onIonChange={(e: any) =>
                          handleInputChange(e.detail.value!, "gruposangre")
                        }
                      >
                        {grupoSanguineos.map((item: any, index: any) => (
                          <IonSelectOption value={item.value} key={index}>
                            {item.label}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                  </IonList>
                  <IonItem>
                    <IonLabel>Discapacidad: {checked ? "Si" : "No"}</IonLabel>
                    <IonToggle
                      checked={checked}
                      onIonChange={(e) => setChecked(e.detail.checked)}
                    />
                  </IonItem>

                  <div className="pt-2 text-center">
                    <IonButton
                      className="border-radius"
                      fill="outline"
                      onClick={handleAdd}
                    >
                      Guardar perfil
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
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

export default PerfilCrear;
