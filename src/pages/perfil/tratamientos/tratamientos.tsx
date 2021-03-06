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
  IonToggle,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { Link } from "react-router-dom";
import {
  serviciosPaciente,
  getMedicamentos,
  getTratamientosPacientes,
  getTipoDiagnosticosPacientes,
} from "../../../servicios/servicios";
import { useListado, useForm } from "../../../hook";
import {
  valTratamiento,
  FORMTRATAMIENTOS,
  totalDosisTratamiento,
  fechaDiaAdd,
  filterNombre,
} from "../../../helpers";
import { HeaderPerfil } from "../../../components";

const PerfilTratamientos = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);

  const [formulario, handleInputChange, handleInputReset, setFormulario] =
    useForm(FORMTRATAMIENTOS);

  const [
    handleAddAll,
    handleAddItem,
    handleDeletItem,
    handleUpdateItem,
    listado,
  ] = useListado();

  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const [select, setSelect] = useState<any>(null);
  const [tipoDiagnostico, setTipoDiagnostico] = useState("");
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [diagnostico, setDiagnostico] = useState("");
  const [prolongado, setProlongado] = useState(false);
  const [recordatorio, setRecordatorio] = useState(false);
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
  }, [user]);

  useEffect(() => {
    if (tipoDiagnostico !== "") {
      getTipoDiagnosticosPacientes(user.idpaciente, tipoDiagnostico)
        .then((rsp: any) => {
          const { data } = rsp;
          setDiagnosticos(data.data);
        })
        .catch((error) => {
          console.error("Error en peticion enfermedades" + error);
        });
    }
  }, [tipoDiagnostico, user]);

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

  const handleCalcularDuracion = (valor: any) => {
    if (formulario.dosis !== 0 && formulario.cada !== 0 && valor !== 0) {
      const total = totalDosisTratamiento(
        parseInt(formulario.dosis),
        parseInt(formulario.cada),
        parseInt(valor)
      );
      setFormulario({ ...formulario, totaldosis: total, duracion: valor });
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
    } else {
      setFormulario({
        ...formulario,
        fechainicio: fecha,
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
      let prolong = prolongado ? "si" : "no";
      let recordat = recordatorio ? "activo" : "inactivo";
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
      formDa.append("idtipo", tipoDiagnostico);
      formDa.append("prolongado", prolong);
      formDa.append("recordatorio", recordat);
      if (tipoDiagnostico === "1") {
        formDa.append("idalergia", diagnostico);
      } else {
        formDa.append("idenfermedad", diagnostico);
      }
      let resultado = filterNombre(diagnostico, diagnosticos);
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
                diagnostico: resultado,
                idmedicamento: select.value,
                medicamento: select.label,
                dosis: formulario.dosis,
                cada: formulario.cada,
                totaldosis: formulario.totaldosis,
                fechainicio: formulario.fechainicio,
                duracion: formulario.duracion,
                fechafin: formulario.fechafin,
                notas: formulario.notas,
                recordatorio: recordat,
                prolongado: prolong,
              };
              console.log(state);
              handleAddItem(state);
              setTransition(false);
              setSelect(null);
              setTipoDiagnostico("");
              setDiagnosticos([]);
              setDiagnostico("");
              setProlongado(false);
              setRecordatorio(false);
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

  function handleToggle(id: any, recordatorio: any, item: any) {
    console.log({ id, recordatorio, item });
    let std = recordatorio === "activo" ? "inactivo" : "activo";
    let formDa = new FormData();
    formDa.append("op", "toggleTratamiento");
    formDa.append("id", id);
    formDa.append("estado", std);
    serviciosPaciente(formDa)
      .then(function (response: any) {
        const { data, status } = response;
        if (status === 200) {
          if (data.rsp === 1) {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
            const nuevo = { ...item, recordatorio: std };
            handleUpdateItem(nuevo);
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
  }

  return (
    <IonPage className="fondo">
      <HeaderPerfil title="Tratamientos activos" />
      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          {transition && (
            <IonRow>
              <IonCol size="12" className="px-3">
                <IonCard className="m-0 mb-2 mt-4 pb-2 card-slide">
                  <IonCardContent>
                    <IonList>
                      <IonItem>
                        <IonLabel position="stacked">
                          Tipo de diagn??stico{" "}
                          <span className="text-danger">*</span>
                        </IonLabel>
                        <IonSelect
                          interface="action-sheet"
                          placeholder="Tipo"
                          value={tipoDiagnostico}
                          onIonChange={(e) => {
                            setTipoDiagnostico(e.detail.value!);
                          }}
                        >
                          <IonSelectOption value="1">Alergias</IonSelectOption>
                          <IonSelectOption value="2">
                            Enfermedades
                          </IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    </IonList>
                    <IonList className="mb-2">
                      <IonItem>
                        <IonLabel position="stacked">
                          Diagn??stico <span className="text-danger">*</span>
                        </IonLabel>
                        <IonSelect
                          interface="action-sheet"
                          placeholder="Tipo"
                          value={diagnostico}
                          onIonChange={(e) => {
                            setDiagnostico(e.detail.value!);
                          }}
                        >
                          {diagnosticos.map((item: any) => (
                            <IonSelectOption
                              key={item.value}
                              value={item.value}
                            >
                              {item.label}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    </IonList>
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
                        Dosis<span className="text-danger">*</span>
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
                        Cada hora(s)<span className="text-danger">*</span>
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
                    <IonItem>
                      <IonLabel position="stacked">
                        Fecha Inicio <span className="text-danger">*</span>
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
                        Duraci??n (d??as) <span className="text-danger">*</span>
                      </IonLabel>
                      <IonInput
                        name="duracion"
                        type="number"
                        value={formulario.duracion}
                        onIonChange={(e) => {
                          /*handleInputChange(e.detail.value!, "duracion");*/
                          handleCalcularDuracion(e.detail.value);
                        }}
                        onIonBlur={() => {
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
                    <IonItem>
                      <IonLabel>Medicamento de uso prolongado</IonLabel>
                      <IonToggle
                        checked={prolongado}
                        onIonChange={(e) => setProlongado(e.detail.checked)}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel>Recordatorio</IonLabel>
                      <IonToggle
                        checked={recordatorio}
                        onIonChange={(e) => setRecordatorio(e.detail.checked)}
                      />
                    </IonItem>
                  </IonCardContent>
                </IonCard>

                <div className="pt-2 text-center">
                  <IonButton
                    className="border-radius"
                    fill="outline"
                    onClick={handleAdd}
                  >
                    Agregar
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
              </IonCol>
            </IonRow>
          )}
          {!transition && (
            <IonRow className="mt-4 px-3">
              <IonCol size="12" className="pb-3">
                <IonRow>
                  <IonCol size="12">
                    <h5 className="font-w700 fs-15 text-info-dark mb-2">
                      Tratamiento transitorio
                    </h5>
                  </IonCol>
                </IonRow>
                <IonRow>
                  {listado.length === 0
                    ? "Sin tratamientos registrados"
                    : listado
                        .filter((item: any) => item.prolongado === "no")
                        .map((item: any, index: number) => (
                          <IonCard
                            className="m-0 mb-3 card-slide shadow-full"
                            style={{ height: "auto" }}
                            key={index}
                          >
                            <IonCardContent className="card-content-slide">
                              <IonRow>
                                <IonCol size="9" sizeLg="10">
                                  <div className="fs-15 font-w500 text-info-dark line-height-1 mb-3">
                                    {item.diagnostico}
                                  </div>

                                  <p className="fs-12 line-height-13 mb-2">
                                    {item.medicamento}
                                  </p>
                                  <p className="fs-12 line-height-13 mb-2">
                                    <span className="font-w600">
                                      {item.dosis} dosis{" "}
                                    </span>
                                    cada
                                    <span className="font-w600">
                                      {" "}
                                      {item.cada} hora(s){" "}
                                    </span>
                                    durante
                                    <span className="font-w600">
                                      {" "}
                                      {item.duracion} d??as
                                    </span>
                                  </p>
                                  <p className="fs-12">
                                    {item.totaldosis} dosis en total
                                  </p>
                                  <div className="fs-12">
                                    Desde el {item.fechainicio} hasta el{" "}
                                    {item.fechafin}
                                  </div>
                                </IonCol>
                                <IonCol
                                  size="3"
                                  sizeLg="2"
                                  className="text-center"
                                >
                                  <IonToggle
                                    checked={
                                      item.recordatorio === "activo"
                                        ? true
                                        : false
                                    }
                                    onIonChange={(e) => {
                                      handleToggle(
                                        item.id,
                                        item.recordatorio,
                                        item
                                      );
                                    }}
                                  />
                                  <div className="fs-10">Recordatorio</div>
                                </IonCol>
                              </IonRow>

                              <p className="fs-12 mt-3">
                                <span className="font-w500 d-block">Nota </span>
                                {item.notas}
                              </p>
                              <Link
                                to="#"
                                className="text-danger d-block fs-12 text-underline mt-3"
                                onClick={() => {
                                  handleDelet(item.id);
                                }}
                              >
                                Eliminar
                              </Link>
                            </IonCardContent>
                          </IonCard>
                        ))}
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <h5 className="font-w700 fs-15 text-info-dark mb-2">
                      Tratamiento permanente
                    </h5>
                  </IonCol>
                </IonRow>
                <IonRow>
                  {listado.length === 0
                    ? "Sin tratamientos registrados"
                    : listado
                        .filter((item: any) => item.prolongado === "si")
                        .map((item: any, index: number) => (
                          <IonCard
                            className="m-0 mb-3 card-slide shadow-full"
                            style={{ height: "auto" }}
                            key={index}
                          >
                            <IonCardContent className="card-content-slide">
                              <IonRow>
                                <IonCol size="9" sizeLg="10">
                                  <div className="fs-15 font-w500 text-info-dark line-height-1 mb-3">
                                    {item.diagnostico}
                                  </div>

                                  <p className="fs-12 line-height-13 mb-2">
                                    {item.medicamento}
                                  </p>
                                  <p className="fs-12 line-height-13 mb-2">
                                    <span className="font-w600">
                                      {item.dosis} dosis{" "}
                                    </span>
                                    cada
                                    <span className="font-w600">
                                      {" "}
                                      {item.cada} hora(s){" "}
                                    </span>
                                    durante
                                    <span className="font-w600">
                                      {" "}
                                      {item.duracion} d??as
                                    </span>
                                  </p>
                                  <p className="fs-12">
                                    {item.totaldosis} dosis en total
                                  </p>
                                  <div className="fs-12">
                                    Desde el {item.fechainicio} hasta el{" "}
                                    {item.fechafin}
                                  </div>
                                </IonCol>
                                <IonCol
                                  size="3"
                                  sizeLg="2"
                                  className="text-center"
                                >
                                  <IonToggle
                                    checked={
                                      item.recordatorio === "activo"
                                        ? true
                                        : false
                                    }
                                    onIonChange={(e) => {
                                      handleToggle(
                                        item.id,
                                        item.recordatorio,
                                        item
                                      );
                                    }}
                                  />
                                  <div className="fs-10">Recordatorio</div>
                                </IonCol>
                              </IonRow>

                              <p className="fs-12 mt-3">
                                <span className="font-w500 d-block">Nota </span>
                                {item.notas}
                              </p>
                              <Link
                                to="#"
                                className="text-danger d-block fs-12 text-underline mt-3"
                                onClick={() => {
                                  handleDelet(item.id);
                                }}
                              >
                                Eliminar
                              </Link>
                            </IonCardContent>
                          </IonCard>
                        ))}
                </IonRow>
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
                    Nuevo tratamiento
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
