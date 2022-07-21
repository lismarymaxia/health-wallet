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
  useIonViewDidEnter,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { serviciosPaciente, servicesWh, getEnfermedad } from "../../servicios";
import { Header } from "../../components";
import { grupoSanguineos, grupodiscapacidad } from "../../helpers";
import { useForm } from "../../hook";
import "../../style/tema.css";
import "./perfil.css";

const PerfilCrear = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [transition, setTransition] = useState(false);
  const [alergias, setAlergias] = useState([]);
  const [alergia, setAlergia] = useState("");
  const [grupoAlergias, setGrupoAlergias] = useState([]);
  const [grupo, setGrupo] = useState("");
  const [enfermedad, setEnfermedad] = useState({ label: "", value: "" });
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });
  const initial = {
    nombre: "",
    apellido: "",
    documento: "",
    nacimiento: "",
    edad: "",
    sangre: "",
    discapacidad: "",
  };

  const [form, handleInputChange, handleInputReset] = useForm(initial);

  const handleCrear = (id: any, item: any) => {
    let formDa = new FormData();
    formDa.append("op", "addFavorito");
    formDa.append("idafiliado", id);
    formDa.append("idusuario", user.id);
    serviciosPaciente(formDa)
      .then(function (response) {
        const { data, status } = response;
        if (status === 200) {
          if (data.rsp === 1) {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
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

  useIonViewDidEnter(() => {
    servicesWh
      .get("/controller/combosback.php", {
        params: {
          op: "gruposdealergias",
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp: any) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setGrupoAlergias(data.data);
          } else {
            setGrupoAlergias([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });

  const handleAlergia = (id: any) => {
    setGrupo(id);
    servicesWh
      .get("/controller/combosback.php", {
        params: {
          op: "alergias",
          idgrupo: id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            console.log(data.data);
            setAlergias(data.data);
          } else {
            setAlergias([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const handleSearch = (e: any) => {
    setEnfermedad({ ...enfermedad, label: e });
    console.log(e);
    if (e.length > 3) {
      getEnfermedad(e)
        .then((rsp: any) => {
          const { data, estatus } = rsp.data;
          if (estatus === "ok") {
            if (data) {
              //setData(data);
            }
          }
        })
        .catch((e: any) => {
          console.warn(e);
        });
    } else if (e.length < 3) {
      //setData([]);
      // setTransition(false);
    }
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
                  {!transition && (
                    <div>
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
                          Fecha de nacimiento{" "}
                          <span className="text-danger">*</span>
                        </IonLabel>
                        <IonInput
                          type="date"
                          value={form.nacimiento}
                          onIonChange={(e: any) =>
                            handleInputChange(e.detail.value!, "nacimiento")
                          }
                        >
                          {" "}
                        </IonInput>
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
                            Grupo sanguíneo{" "}
                            <span className="text-danger">*</span>
                          </IonLabel>
                          <IonSelect
                            interface="action-sheet"
                            placeholder="Tipo"
                            value={form.sangre}
                            onIonChange={(e: any) =>
                              handleInputChange(e.detail.value!, "sangre")
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
                    </div>
                  )}
                  {transition && (
                    <div>
                      <IonList>
                        <IonItem>
                          <IonLabel position="stacked">Discapacidad</IonLabel>
                          <IonSelect
                            interface="action-sheet"
                            placeholder="Seleccionar"
                            value={form.discapacidad}
                            onIonChange={(e: any) =>
                              handleInputChange(e.detail.value!, "discapacidad")
                            }
                          >
                            {grupodiscapacidad.map(
                              (item: any, index: number) => (
                                <IonSelectOption value={item.value} key={index}>
                                  {item.label}
                                </IonSelectOption>
                              )
                            )}
                          </IonSelect>
                        </IonItem>
                        <span className="fs-12 text-underline text-light cursor-pointer">
                          Cargar carnet de SENADIS
                        </span>
                      </IonList>
                      <IonItem>
                        <IonLabel position="stacked">
                          Enfermedades crónicas
                        </IonLabel>
                        <IonInput
                          value={enfermedad.label}
                          placeholder="Enfermedad"
                          onIonChange={(e) => handleSearch(e.detail.value!)}
                        >
                          {" "}
                        </IonInput>
                      </IonItem>
                      <IonList>
                        <IonItem>
                          <IonLabel position="stacked">
                            Grupo <span className="text-danger">*</span>
                          </IonLabel>
                          <IonSelect
                            value={grupo}
                            interface="action-sheet"
                            placeholder="Selecionar"
                            onIonChange={(e) => handleAlergia(e.detail.value!)}
                          >
                            {grupoAlergias.map((item: any, index: any) => (
                              <IonSelectOption value={item.value} key={index}>
                                {item.label}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                        </IonItem>
                      </IonList>

                      <IonList>
                        <IonItem>
                          <IonLabel position="stacked">
                            Alergias <span className="text-danger">*</span>
                          </IonLabel>
                          <IonSelect
                            value={alergia}
                            interface="action-sheet"
                            placeholder="Tipo"
                            onIonChange={(e: any) =>
                              setAlergia(e.detail.value!)
                            }
                          >
                            {alergias.map((item: any, index: any) => (
                              <IonSelectOption value={item.value} key={index}>
                                {item.label}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                        </IonItem>
                      </IonList>

                      <IonItem>
                        <IonLabel position="stacked">
                          Tratamientos activos
                        </IonLabel>
                        <IonInput value=""> </IonInput>
                      </IonItem>
                    </div>
                  )}
                  {transition && (
                    <div className="pt-2 text-center">
                      <IonButton className="border-radius" fill="outline">
                        Guardar perfil
                      </IonButton>
                    </div>
                  )}
                  {!transition && (
                    <div className="pt-2 text-center">
                      <IonButton
                        className="border-radius"
                        fill="outline"
                        onClick={() => {
                          setTransition(true);
                        }}
                      >
                        Siguiente
                      </IonButton>
                    </div>
                  )}
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
