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
  IonItemDivider,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { Link } from "react-router-dom";
import {
  getEnfermedadPaciente,
  serviciosPaciente,
  getMedicamentos,
} from "../../../servicios/servicios";
import { useListado, useForm } from "../../../hook";
import {
  valEnfermedad,
  FORMTRATAMIENTOS,
  totalDosisTratamiento,
  fechaDiaAdd,
} from "../../../helpers";
import { HeaderPerfil } from "../../../components";

const PerfilTratamientos = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [formulario, handleInputChange, handleInputReset, setFormulario] =
    useForm(FORMTRATAMIENTOS);
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

  const handleCalcular = () => {
    if (
      formulario.dosis !== 0 &&
      formulario.cada !== 0 &&
      formulario.duracion
    ) {
      const total = totalDosisTratamiento(
        parseInt(formulario.dosis),
        parseInt(formulario.cada),
        parseInt(formulario.duracion)
      );
      setFormulario({ ...formulario, totaldosis: total });
    }
  };

  const handleFecha = (fecha: any) => {
    setFormulario({ ...formulario, fechainicio: fecha });
    console.log(fechaDiaAdd(fecha, formulario.duracion));
  };
  const loadOptions = (input: string, callback: any) => {
    getMedicamentos(input)
      .then((rsp: any) => {
        const { data } = rsp;
        callback(data.data);
      })
      .catch((error) => {
        console.error("Error en peticion enfermedades" + error);
      });
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
      <HeaderPerfil title="Tratamientos activos" />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          {transition && (
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
                    <div className="pr-3">
                      <span className="text-dark">Medicamento *</span>
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={select}
                        onChange={setSelect}
                        loadOptions={loadOptions}
                        placeholder={"Seleccionar"}
                        noOptionsMessage={() => "Escriba el medicamento"}
                        styles={customStyles}
                      />
                    </div>
                    <IonItem>
                      <IonLabel position="stacked">
                        dosis<span className="text-danger">*</span>
                      </IonLabel>
                      <IonInput
                        name="dosis"
                        value={formulario.dosis}
                        type="number"
                        onIonChange={(e) => {
                          handleInputChange(e.detail.value!, "dosis");
                        }}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">
                        Cada <span className="text-danger">*</span>
                      </IonLabel>
                      <IonInput
                        name="cada"
                        type="number"
                        value={formulario.cada}
                        onIonChange={(e) => {
                          handleInputChange(e.detail.value!, "cada");
                        }}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">
                        Total dosis <span className="text-danger">*</span>
                      </IonLabel>
                      <IonInput
                        name="totaldosis"
                        disabled
                        value={formulario.totaldosis}
                      ></IonInput>
                    </IonItem>
                    <IonItemDivider>
                      <b>Duración</b>
                    </IonItemDivider>
                    <IonItem>
                      <IonLabel position="stacked">
                        Fecha Inicion <span className="text-danger">*</span>
                      </IonLabel>
                      <IonInput
                        name="fechainicio"
                        type="date"
                        value={formulario.fechainicio}
                        onIonChange={(e) => {
                          handleFecha(e.detail.value!);
                        }}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">
                        Duracion(dias) <span className="text-danger">*</span>
                      </IonLabel>
                      <IonInput
                        name="duracion"
                        type="number"
                        value={formulario.duracion}
                        onIonChange={(e) => {
                          handleInputChange(e.detail.value!, "duracion");
                        }}
                        onIonBlur={handleCalcular}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">
                        Fecha fin<span className="text-danger">*</span>
                      </IonLabel>
                      <IonInput
                        name="fechafin"
                        disabled
                        value={formulario.fechafin}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">
                        Notas <span className="text-danger">*</span>
                      </IonLabel>
                      <IonInput
                        name="notas"
                        value={formulario.notas}
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
                        agregar
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
                {listado.length === ""
                  ? "Sin enfermedades resgitradas"
                  : listado.map((item: any, index: number) => (
                      <IonCard
                        className="m-0 card-slide shadow-full"
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
                    className="border-radius"
                    fill="outline"
                    onClick={() => {
                      setTransition(true);
                    }}
                  >
                    Nueva tratamiento
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

export default PerfilTratamientos;
