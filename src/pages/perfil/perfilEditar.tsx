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
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components";
import { storeLocal } from "../../store/action/aut";
import { serviciosPaciente, getPerfilEdicion } from "../../servicios/servicios";
import { grupoSanguineos } from "../../helpers";

const PerfilEditar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState("");
  const [grupoSangre, setGrupoSangre] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getPerfilEdicion(user.idpaciente)
      .then((rsp: any) => {
        const { data } = rsp;
        const {
          nombre,
          apellido,
          cedula,
          discapacidad,
          edad,
          fechanacimiento,
          gruposangre,
        } = data.data;
        setNombre(nombre);

        setApellido(apellido);
        setCedula(cedula);
        setFechaNacimiento(fechanacimiento);
        setEdad(edad);
        setGrupoSangre(gruposangre);
        let d = discapacidad === "si" ? true : false;
        setChecked(d);
      })
      .catch((error) => {
        console.error("Error en get perfiles" + error);
      });
  }, [user]);

  const handleAdd = () => {
    let discapacidad = checked ? "si" : "no";
    let formDa = new FormData();
    formDa.append("op", "editPaciente");
    formDa.append("id", user.idpaciente);
    formDa.append("idusuario", user.id);
    formDa.append("nombre", nombre);
    formDa.append("apellido", apellido);
    formDa.append("cedula", cedula);
    formDa.append("fechanacimiento", fechaNacimiento);
    formDa.append("gruposangre", grupoSangre);
    formDa.append("edad", edad);
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

            let clone = {
              ...user,
              nombre: nombre,
              apellido: apellido,
              cedula: cedula,
            };
            let nueva = Object.assign({}, user, clone);
            dispatch(storeLocal(nueva));
            history.replace("/app/perfil");
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
      <Header title="Perfil" isbotton={true} isBuger={false} />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow>
            <IonCol size="12" className="px-3 mt-3">
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
                      value={nombre}
                      onIonChange={(e: any) => setNombre(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Apellido <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      value={apellido}
                      onIonChange={(e: any) => setApellido(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      N° de documento <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      value={cedula}
                      onIonChange={(e: any) => setCedula(e.detail.value!)}
                    ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">
                      Fecha de nacimiento <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      type="date"
                      value={fechaNacimiento}
                      onIonChange={(e: any) =>
                        setFechaNacimiento(e.detail.value!)
                      }
                    ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Edad</IonLabel>
                    <IonInput
                      value={edad}
                      onIonChange={(e: any) => setEdad(e.detail.value!)}
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
                        value={grupoSangre}
                        onIonChange={(e: any) =>
                          setGrupoSangre(e.detail.value!)
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
                  <IonItem className="border-none">
                    <IonLabel>Discapacidad: {checked ? "Si" : "No"}</IonLabel>
                    <IonToggle
                      checked={checked}
                      onIonChange={(e) => setChecked(e.detail.checked)}
                    />
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <div className="pt-2 text-center">
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

export default PerfilEditar;
