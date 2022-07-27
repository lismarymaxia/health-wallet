import { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonToast,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
} from "@ionic/react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { Link } from "react-router-dom";
import {
  getEnfermedadPaciente,
  getEnfermedad,
  serviciosPaciente,
} from "../../../servicios/servicios";
import { useListado } from "../../../hook";
import { valEnfermedad } from "../../../helpers";
import { HeaderPerfil } from "../../../components";

const PerfilEnfermedades = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [handleAddAll, handleAddItem, handleDeletItem, , listado] =
    useListado();
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });
  const [select, setSelect] = useState<any>(null);
  const [tratamiento, setTratamiento] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [transition, setTransition] = useState(false);
  useEffect(() => {
    getEnfermedadPaciente(user.idpaciente)
      .then((rsp: any) => {
        const { data } = rsp;
        handleAddAll(data.data);
      })
      .catch((error) => {
        console.error("Error en peticion enfermedades" + error);
      });
  }, []);

  const loadOptions = (input: string, callback: any) => {
    getEnfermedad(input)
      .then((rsp: any) => {
        const { data } = rsp;
        callback(data.data);
      })
      .catch((error) => {
        console.error("Error en peticion enfermedades" + error);
      });
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? "#3B72A2" : "gray",
      fontWeight: "500",
      padding: "8px",
      backgroundColor: state.isFocused ? "#eaecf0" : "white",
    }),
    menu: () => ({
      border: "1px solid #ccc",
      borderRadius: "0 0 0.4rem 0.4rem",
    }),
  };

  const handleAdd = () => {
    const { estado, msg } = valEnfermedad(select, tratamiento, frecuencia);
    if (estado) {
      let formDa = new FormData();
      formDa.append("op", "addEnfermedad");
      formDa.append("id", user.idpaciente);
      formDa.append("idenfermedad", select.value);
      formDa.append("tratamiento", tratamiento);
      formDa.append("frecuencia", frecuencia);
      serviciosPaciente(formDa)
        .then(function (response: any) {
          const { data, status } = response;
          if (status === 200) {
            if (data.rsp === 1) {
              setNotificacion({
                msg: data.msg,
                estado: true,
              });
              const state: any = {
                id: data.id,
                idenfermedad: select.value,
                enfermedad: select?.label,
                tratamiento: tratamiento,
                frecuencia: frecuencia,
              };

              handleAddItem(state);
              setTransition(false);
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
    } else {
      setNotificacion({
        msg: msg,
        estado: true,
      });
    }
  };

  const handleDelet = (id: any) => {
    let formDa = new FormData();
    formDa.append("op", "deletEnfermedad");
    formDa.append("id", id);
    serviciosPaciente(formDa)
      .then(function (response: any) {
        const { data, status } = response;
        if (status === 200) {
          if (data.rsp === 1) {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
            handleDeletItem(id);
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
      <HeaderPerfil title="Enfermedades activas" />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          {transition && (
            <IonRow>
              <IonCol size="12" className="px-3">
                <IonCard className="m-0 mb-2 mt-4 pb-2 card-slide">
                  <IonCardContent>
                    <div className="pr-3">
                      <span className="text-dark">Enfermedad *</span>
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={select}
                        onChange={setSelect}
                        loadOptions={loadOptions}
                        placeholder={"Seleccionar"}
                        noOptionsMessage={() => "Escriba la enfermedad"}
                        styles={customStyles}
                      />
                    </div>
                    <IonItem>
                      <IonLabel position="stacked">
                        Tratamiento <span className="text-danger">*</span>
                      </IonLabel>
                      <IonInput
                        name="tratamiento"
                        value={tratamiento}
                        onIonChange={(e) => {
                          setTratamiento(e.detail.value!);
                        }}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">
                        Frecuencias <span className="text-danger">*</span>
                      </IonLabel>
                      <IonInput
                        name="frecuencia"
                        value={frecuencia}
                        onIonChange={(e) => {
                          setFrecuencia(e.detail.value!);
                        }}
                      ></IonInput>
                    </IonItem>
                    <div className="pt-2 text-center">
                      <IonButton
                        className="border-radius"
                        fill="outline"
                        onClick={handleAdd}
                      >
                        Guardar
                      </IonButton>
                      <IonButton
                        color="danger"
                        className="border-radius"
                        fill="outline"
                        onClick={() => {
                          setTransition(false);
                        }}
                      >
                        Cancelar
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
          {!transition && (
            <IonRow className="mt-4 px-3">
              <IonCol size="12" className="pb-3">
                <IonRow>
                  <IonCol size="12">
                    <h5 className="font-w700 fs-15 text-info-dark mb-2">
                      Listado de enfermedades
                    </h5>
                  </IonCol>
                </IonRow>
                {listado.length === 0
                  ? "Sin enfermedades registradas"
                  : listado.map((item: any, index: number) => (
                      <IonCard
                        className="mt-2 card-slide shadow-full"
                        style={{ height: "auto" }}
                        key={index}
                      >
                        <IonCardContent className="card-content-slide">
                          <p>
                            <b>Enfermedad:</b>
                            {item.enfermedad}
                          </p>
                          <p>
                            <b>Tratamiento:</b>
                            {item.tratamiento}
                          </p>
                          <p>
                            <b>Frecuencia:</b>
                            {item.frecuencia}
                          </p>
                          <Link
                            to="#"
                            className="text-danger d-block fs-12 text-underline"
                            onClick={() => {
                              handleDelet(item.id);
                            }}
                          >
                            Eliminar
                          </Link>
                        </IonCardContent>
                      </IonCard>
                    ))}
              </IonCol>
              <IonCol>
                <div className="text-center">
                  <IonButton
                    className="button-deg"
                    fill="outline"
                    onClick={() => {
                      setTransition(true);
                    }}
                  >
                    Nueva enfermedad
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          )}
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

export default PerfilEnfermedades;
