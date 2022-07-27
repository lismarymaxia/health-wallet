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
  getTratamientosPacientes,
  serviciosPaciente,
  getMedicamentos,
} from "../../../servicios/servicios";
import { useListado, useForm } from "../../../hook";
import {
  valTratamiento,
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
    getTratamientosPacientes(user.idpaciente)
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
      formulario.duracion !== 0
    ) {
      const total = totalDosisTratamiento(
        parseInt(formulario.dosis),
        parseInt(formulario.cada),
        parseInt(formulario.duracion)
      );
      setFormulario({ ...formulario, totaldosis: total });
    }
  };

  const handleFechaInicio = (fecha: any) => {
    if (fecha !== null && formulario.duracion !== 0) {
      const { frontend, backend } = fechaDiaAdd(fecha, formulario.duracion);
      setFormulario({
        ...formulario,
        fechainicio: fecha,
        fechafin: frontend,
        fechafinBackend: backend,
      });
    }
  };

  const handleFechaFin = () => {
    if (formulario.fechainicio !== null && formulario.duracion !== null) {
      const { frontend, backend } = fechaDiaAdd(
        formulario.fechainicio,
        formulario.duracion
      );
      setFormulario({
        ...formulario,
        fechafin: frontend,
        fechafinBackend: backend,
      });
    }
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
    const { estado, msg } = valTratamiento(
      select,
      formulario.dosis,
      formulario.cada,
      formulario.totaldosis,
      formulario.fechainicio,
      formulario.duracion,
      formulario.fechafin,
      formulario.notas
    );
    if (estado) {
      let formDa = new FormData();
      formDa.append("op", "addTratamiento");
      formDa.append("id", user.idpaciente);
      formDa.append("idmedicamento", select.value);
      formDa.append("dosis", formulario.dosis);
      formDa.append("cada", formulario.cada);
      formDa.append("totaldosis", formulario.totaldosis);
      formDa.append("fechainicio", formulario.fechainicio);
      formDa.append("duracion", formulario.duracion);
      formDa.append("fechafin", formulario.fechafinBackend);
      formDa.append("notas", formulario.notas);
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
                idmedicamento: select.value,
                medicamento: select.label,
                dosis: formulario.dosis,
                cada: formulario.cada,
                totaldosis: formulario.totaldosis,
                fechainicio: formulario.fechainicio,
                duracion: formulario.duracion,
                fechafin: formulario.fechafin,
                notas: formulario.notas,
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
    formDa.append("op", "deletTratamiento");
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
                        onIonBlur={handleCalcular}
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
                        onIonBlur={handleCalcular}
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
                          handleFechaInicio(e.detail.value!);
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
                        onIonBlur={() => {
                          handleCalcular();
                          handleFechaFin();
                        }}
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
                          handleInputChange(e.detail.value!, "notas");
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
                            <b>Medicamento:</b>
                            {item.medicamento}
                          </p>
                          <p>
                            <b>Dosis:</b>
                            {item.dosis}
                          </p>
                          <p>
                            <b>Cada (hora):</b>
                            {item.cada}
                          </p>
                          <p>
                            <b>Total dosis:</b>
                            {item.totaldosis}
                          </p>
                          <p>
                            <b>Fecha inicio:</b>
                            {item.fechainicio}
                          </p>
                          <p>
                            <b>Fecha fin:</b>
                            {item.fechafin}
                          </p>
                          <p>
                            <b>Duracion (dias):</b>
                            {item.duracion}
                          </p>
                          <p>
                            <b>Nota:</b>
                            {item.notas}
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
